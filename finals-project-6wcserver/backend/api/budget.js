// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { Budget } from '../models/models.js';

const router = express.Router();

// Create budget
router.post('/', asyncHandler(async (req,res) => {
    const budget = new Budget(req.body);
    await budget.save();
    res.json(budget);
}));

//Read budget
router.get('/:id', asyncHandler(async (req,res) => {
    const budgets = await Budget.find({ user_id: req.params.id });
    res.json(budgets);
}));

// export
export default router;
