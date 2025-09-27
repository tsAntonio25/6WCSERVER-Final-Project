// imports
import express from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { Expense } from '../models/models.js';
import { Budget } from '../models/models.js';

const router = express.Router();

router.get('/:userId', asyncHandler(async (req, res) => {
    const id = req.params.userId;
    const userId = new mongoose.Types.ObjectId(id)

    // console.log('Computing savings for user:', userId);

    let currentSavings = 0;
    let expenses = 0;

    // total budget
    const totalBudget = await Budget.aggregate([
        { $match: { user_id: userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    
    // verify if budget is read
    // console.log('Total budget:', totalBudget);

    // food
    const totalFood = await Expense.aggregate([
        { $match: { user_id: userId, type: "food" } },
        { $group: { _id: null, total: { $sum: "$expense" } } }
    ]);

    // leisure
    const totalLeisure = await Expense.aggregate([
        { $match: { user_id: userId, type: "leisure" } },
        { $group: { _id: null, total: { $sum: "$expense" } } }
    ]);

    // transportation
    const totalTransportation = await Expense.aggregate([
        { $match: { user_id: userId, type: "transportation" } },
        { $group: { _id: null, total: { $sum: "$expense" } } }
    ]);

    // others
    const totalOthers = await Expense.aggregate([
        { $match: { user_id: userId, type: "others" } },
        { $group: { _id: null, total: { $sum: "$expense" } } }
    ]);

    // total expenses
    const totalExpenses = await Expense.aggregate([
        { $match: { user_id: userId } },
        { $group: { _id: null, total: { $sum: "$expense" } } }
    ]);

    // verify if expense is read
    // console.log('Total expense:', totalExpenses);
    // console.log('Total food:', totalFood);
    // console.log('Total leisure:', totalLeisure);
    // console.log('Total transportation:', totalTransportation);
    // console.log('Total others:', totalOthers);


    if (totalBudget.length > 0) {
        currentSavings = totalBudget[0].total;
    } else {
        currentSavings = 0;
    }   

    if (totalExpenses.length > 0) {
        expenses = totalExpenses[0].total;
    } else {
        expenses = 0;
    }

    // calculate total savings
    const totalSavings = currentSavings - expenses;

    // response
    res.json({
        totalSavings,
        food: totalFood[0]?.total || 0,
        leisure: totalLeisure[0]?.total || 0,
        transportation: totalTransportation[0]?.total || 0,
        others: totalOthers[0]?.total || 0,
        totalBudgetAmount: totalBudget[0]?.total || 0,
        totalExpenseAmount: totalExpenses[0]?.total || 0
    });
}));

export default router;

