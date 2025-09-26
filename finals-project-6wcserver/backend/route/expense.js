// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { Expense } from '../models/models.js';

const router = express.Router();

// relative routes only;
// Create expense
router.post("/", asyncHandler(async (req, res) => {
    const { userId, type, expense } = req.body;

    const newExpense = new Expense({
        user_id: userId,
        finance_type: "expense",
        type,
        expense,
    });

    await newExpense.save();
    res.json(newExpense);
}));

// Read expense
router.get("/:userId", asyncHandler(async (req,res) => {
    const expenses = await Expense.find({ user_id: req.params.userId });
    res.json(expenses);
}));

// export
export default router;

