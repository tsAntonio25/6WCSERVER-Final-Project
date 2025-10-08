//imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { Budget, Expense, User } from '../models/models.js';
import mongoose from 'mongoose';
import { calculateLevel } from '../modules/level.js';

const router = express.Router();

// get recent transactions (1hr)
router.get('/recent/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    // to filter out recent 1hr transactions
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const Finance = mongoose.connection.collection('finance');
   
    const recent = await Finance.aggregate([
        { $addFields: { timestamp: { $ifNull: ["$date", "$createdAt"] } } },
        { $match: { user_id: new mongoose.Types.ObjectId(userId), timestamp: {$gte: oneHourAgo} } },
        { $sort: { timestamp: -1 } }
    ]).toArray();
   
    res.json(recent)
    console.log(recent)
}))

// delete selected transactions + edit exp
router.delete('/delete', asyncHandler(async (req, res) => {
    const { userId, transactionIds } = req.body;

    if (!userId || !transactionIds || transactionIds.length === 0) {
        return res.json({ message: 'No transactions selected.' })
    }

    const Finance = mongoose.connection.collection('finance')
    const user = await User.findById(userId)
    if (!user) throw new Error('User not found.')

    // fetch the transactions to get how much EXP to subtract
    const transactions = await Finance.find({
        _id: { $in: transactionIds.map(id => new mongoose.Types.ObjectId(id)) },
        user_id: new mongoose.Types.ObjectId(userId)
    }).toArray();

    let totalExpToSubtract = 0

    for (const txn of transactions) {
        if(txn.exp_gain) {
            totalExpToSubtract += txn.exp_gain
        } else if (txn.finance_type === 'budget') {
            // if hindi lang ma access exp_gain (fallback incase, pero di na dapat to lalabas)
            if (txn.allowance_type === 'daily') totalExpToSubtract += 25;
            else if (txn.allowance_type === 'weekly') totalExpToSubtract += 50;
            else if (txn.allowance_type === 'monthly') totalExpToSubtract += 100
        } else if (txn.finance_type === 'expense'){
            totalExpToSubtract += 5
        }
    }

    // delete transactions
    await Finance.deleteMany({
        _id: { $in: transactionIds.map(id => new mongoose.Types.ObjectId(id)) },
        user_id: new mongoose.Types.ObjectId(userId)
    });

    // subtract EXP
    user.exp = Math.max(0, user.exp - totalExpToSubtract);

    // recalculate level after exp update
    const { level } = calculateLevel(user.exp)
    user.level = level;
    
    await user.save();

    res.json({ 
        message: 'Transactions deleted successfully.',
        expSubtracted: totalExpToSubtract,
        newExp: user.exp,
        newLevel: user.level
    });
}));

export default router;