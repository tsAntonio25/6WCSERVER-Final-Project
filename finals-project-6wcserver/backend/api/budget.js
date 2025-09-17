// imports
import express from 'express';
import {Budget} from '../models/models.js';

const router = express.Router();

// Create budget
router.post('/', async (req,res) => {
    const budget = new Budget(req.body);
    await budget.save();
    res.json(budget);
});

//Read budget
router.get('/:id', async (req,res) => {
    const budgets = await Budget.find({user_id: req.params.id});
    res.json(budgets);
});

export default router;
