// imports
import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import { Budget, Expense, User } from '../models/models.js';
import { verifyToken } from '../modules/auth.js';
import { calculateLevel } from '../modules/level.js';



const router = express.Router();

//-------------------------------
// Create user
router.post('/', asyncHandler(async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
}));


//-------------------------------
// Read all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
}));

// Read specific user
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    // throw error
    if (!user) throw new Error("User not found") 
    res.json(user);
}));


//-------------------------------
// Update profile (password and anon username)
router.put('/:id', verifyToken, asyncHandler(async (req, res) => {
    const target = req.params.id;

    if (req.user.id !== target && !req.user.is_admin) {
        throw new Error("Not authorized to update this account");
    }

    const { currentPassword, newPassword, anon_username } = req.body;

    const user = await User.findById(target);
    if (!user) throw new Error("User not found");

    // check new password
    if (newPassword) {
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
    }

    // check anonymous username
    if (anon_username) {
        user.anon_username = anon_username;
    } else {
        user.anon_username = user.username;
    }

    await user.save();
    
    res.json({ message: "Profile updated successfully" });
}));


//-------------------------------
// Delete (Self)
router.delete('/self/:id', verifyToken, asyncHandler(async (req, res) => {
    const target = req.params.id;

    // check if the logged in user matches the account
    if (req.user.id !== target) throw new Error("You can only delete your own account")

    // delete finance first
    const Finance = mongoose.connection.collection('finance');
    await Finance.deleteMany({user_id: new mongoose.Types.ObjectId(target)});

    // delete user itself
    const deleted = await User.findByIdAndDelete(target);
    if (!deleted) throw new Error("User not found");

    res.json({message: "Your account and all records have been deleted"})
}));


// refresh progress bar and level
router.get('/:id/progress', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) throw new Error("User not found.")

    // recalc level
    const levelData = calculateLevel(user.exp)

    res.json({
        streak: user.streak,
        level: levelData.level,
        progress: levelData.progress,
        totalExp: levelData.totalExp,
        expInLevel: levelData.expInLevel,
        expForNext: levelData.expForNext,
        streak: user.streak
    })
}));

router.get('/:id/history', asyncHandler(async (req, res) => {
    const userId = req.params.id;

    // add direct access to whole finance collection
    const Finance = mongoose.connection.collection('finance');

    const history = await Finance.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        // combine two fields into timestamps (used for sorting)
        { $addFields: { timestamp: { $ifNull: ["$date", "$createdAt"] } } },
        { $sort: { timestamp: -1 } },
        { $limit: 5 }
    ]).toArray();

    res.json(history)
    console.log(history)
}));

// get recent budget
router.get('/recent/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const budgets = await mongoose.connection
    .collection('finance')
    .find({
        user_id: new mongoose.Types.ObjectId(userId),
        finance_type: 'budget'
    })
    .sort({createdAt: -1})
    .limit(5)
    .toArray();

    res.json(budgets)
    // test
    console.log('Recent Budgets: ', budgets)
}))

// get users expense per day of the week
router.get('/weekly/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // get sunday and saturday of current week
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - dayOfWeek);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999);

    // aggregate expenses for the week
    const expensesPerDay = await Expense.aggregate([
        { $match: 
            { 
                user_id: new mongoose.Types.ObjectId(userId),
                date: {$gte: startOfWeek, $lte: endOfWeek }
            } 
        },
        { $addFields: { dayOfWeek: { $dayOfWeek: "$date"} } },
        { $group: { _id: "$dayOfWeek", totalAmount: { $sum: "$expense" } } },
        // 1 - sunday ... 7 - saturday
        { $sort: { _id: 1 }}
    ]);

    // if missing days, 0
    const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const data = Array(7).fill(0);

    expensesPerDay.forEach(item => {
       if (item._id >= 1 && item._id <= 7){
        data[item._id - 1] = item.totalAmount
       }
    });

    res.json({ labels, data })
    
    // test
    console.log('Weekly expenses: ',{ labels, data })
}))
// export
export default router;