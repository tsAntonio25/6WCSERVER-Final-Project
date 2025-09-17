// imports
import express from 'express';
import {Expense} from '../models/models.js';

const router = express.Router();

// relative routes only;
// Create expense
router.post("/", async (req,res) =>{
    const expense = new Expense(req.body);
    await expense.save;
    res.json(expense);
});

// Read expense
router.get("/", async (req,res) =>{
    const expenses = await Expense.find();
    res.json(expenses);
});

export default router;

