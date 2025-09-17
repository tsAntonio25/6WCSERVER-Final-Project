// imports
import express from 'express';
import {Expense} from '../models/models.js';

const router = express.Router();

// relative routes only;
// Create expense
router.post("/", async (req,res) => {
    const expense = new Expense(req.body);
    await expense.save;
    res.json(expense);
});

// Read expense
router.get("/:userId", async (req,res) => {
    const expenses = await Expense.find({ user_id: req.params.userId });
    res.json(expenses);
});

export default router;

