// imports
import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import { User } from '../models/models.js';
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

    const deleted = await User.findByIdAndDelete(target);
    if (!deleted) throw new Error("User not found");

    res.json({message: "Your account has been deleted"})
}));

// Delete (Admin)
router.delete('/admin/:id', verifyToken, asyncHandler(async (req, res) => {
    const target = req.params.id;

    // check if the requester is admin
    if(!req.user.is_admin) throw new Error("Not authorized. Admin only.");

    const deleted = await User.findByIdAndDelete(target);
    if (!deleted) throw new Error("User not found");

    res.json({message: "User deleted by admin"})
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
}))

// export
export default router;