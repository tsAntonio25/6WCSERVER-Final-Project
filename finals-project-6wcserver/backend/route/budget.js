// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { Budget } from '../models/models.js';

const router = express.Router();

// Create budget
router.post('/', asyncHandler(async (req,res) => {
    const { userId, allowance_type, amount } = req.body;
    const budget = new Budget({
        user_id: userId,
        finance_type: "budget",
        amount,
        allowance_type,
    });

    await budget.save();
    res.json(budget);
}));

//Read budget
router.get('/:userId', asyncHandler(async (req,res) => {
    const budgets = await Budget.find({ user_id: req.params.userId });
    res.json(budgets);
}));

// export
export default router;
