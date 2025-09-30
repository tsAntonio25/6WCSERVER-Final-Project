// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { Budget, User } from '../models/models.js';

const router = express.Router();

// Create budget
router.post('/', asyncHandler(async (req,res) => {
    const { userId, allowance_type, amount } = req.body;
    
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");

    const now = new Date();

    // check if user is admin
    if(!user.is_admin){
        let startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // today
        let endDate;

        if (allowance_type === 'daily'){
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // today + 1 day
        } else if (allowance_type === 'weekly'){
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7); // today + 7 days
        } else if (allowance_type === "monthly") {
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()); // today + 1 month
        }

        const existing = await Budget.findOne({
            user_id: userId,
            finance_type: "budget",
            createdAt: {$gte: startDate, $lt: endDate}
        });

        if (existing){
            let nextAllowed;

            // for error handling
            if (existing.allowance_type === "daily") {
                nextAllowed = new Date(existing.createdAt);
                nextAllowed.setDate(nextAllowed.getDate() + 1);

            } else if (existing.allowance_type === "weekly") {
                nextAllowed = new Date(existing.createdAt);
                nextAllowed.setDate(nextAllowed.getDate() + 7);

            } else if (existing.allowance_type === "monthly") {
                nextAllowed = new Date(existing.createdAt);
                nextAllowed.setMonth(nextAllowed.getMonth() + 1);
            }
        
        // test log
        console.log(`Adding Budget blocked. User must wait until: ${nextAllowed.toDateString()}`);

        // throw frontend error
        throw new Error(`You already set a ${existing.allowance_type} budget. You may add another on: ${nextAllowed.toDateString()}`);

        }
    }

    const budget = new Budget({
        user_id: userId,
        finance_type: "budget",
        amount,
        allowance_type,
    });

    await budget.save();
    res.json(budget);
}
));

//Read budget
router.get('/:userId', asyncHandler(async (req,res) => {
    const budgets = await Budget.find({ user_id: req.params.userId });
    res.json(budgets);
}));

// export
export default router;
