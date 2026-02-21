// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { Expense, User, Budget } from '../models/models.js';
import { calculateLevel } from '../modules/level.js';
import mongoose from 'mongoose';


const router = express.Router();

// Create expense
router.post("/", asyncHandler(async (req, res) => {
    const { userId, type, expense } = req.body;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");

    if (expense < 10) throw new Error("Expense must be atleast ₱10.")

    const id = new mongoose.Types.ObjectId(userId);
     
    // compute total savings
    const totalBudget = await Budget.aggregate([
        { $match: { user_id: id } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalExpenses = await Expense.aggregate([
        { $match: { user_id: id } },
        { $group: { _id: null, total: { $sum: "$expense" } } }
    ]);


    let currentSavings = totalBudget.length > 0 ? totalBudget[0].total : 0;
    let expenses = totalExpenses.length > 0 ? totalExpenses[0].total : 0;

    const totalSavings = currentSavings - expenses;

    if (totalSavings <= 0) throw new Error("No savings to base EXP on. Please add a budget first.");

    //---- EXP SECTION -----
    let expGain = 0;
    if (expense > 0) {
        expGain = Math.floor(totalSavings / ((expense / totalSavings) * 100));
        if (expGain < 0) expGain = 0;
    }

    // save expense
    const newExpense = new Expense({
        user_id: userId,
        finance_type: "expense",
        type,
        expense,
    });

    // update user exp
    user.exp += expGain;

    // recalculate level
    const levelData = calculateLevel(user.exp)
    user.level = levelData.level
    
    newExpense.exp_gain = expGain;
    
    await newExpense.save();
    await user.save();

    res.json({
        expense: newExpense,
        expGained: expGain,
        totalExp: user.exp,
        totalSavings,
        progress: levelData.progress,
        expForNext: levelData.expForNext,
        expInLevel: levelData.expInLevel
    });
}));

// Read expense
router.get("/:userId", asyncHandler(async (req,res) => {
    const expenses = await Expense.find({ user_id: req.params.userId });
    res.json(expenses);
}));

// export
export default router;

