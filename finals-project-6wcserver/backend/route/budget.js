// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { Budget, User } from '../models/models.js';
import { calculateLevel } from '../modules/level.js';

const router = express.Router();

// Create budget
router.post('/', asyncHandler(async (req,res) => {
    const { userId, allowance_type, amount } = req.body;
    
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");

    if (amount >= 15000) throw new Error("Amount cannot exceed ₱15,000.")

    const now = new Date();
    let startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // today
    let endDate;


    // check if user is admin
    if(!user.is_admin){
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
            
        return res.json({existing_allowance: existing.allowance_type , nextAllowed: nextAllowed.toDateString()})    
        }
    }

    // save budget
    const budget = new Budget({
        user_id: userId,
        finance_type: "budget",
        amount,
        allowance_type,
    });

    await budget.save();

    // ---- EXP SECTION -----
    let expGain = 0;

    if (allowance_type === 'daily') expGain = 25;
    else if (allowance_type === 'weekly') expGain = 50;
    else if (allowance_type === 'monthly') expGain = 100;

    // update user exp
    user.exp += expGain;
    
    // recalculate level
    const levelData = calculateLevel(user.exp)
    user.level = levelData.level

    budget.exp_gain = expGain
    await budget.save();

    await user.save();

    res.json({
        budget,
        expGained: expGain,
        totalExp: user.exp,
        level: user.level,
        progress: levelData.progress,
        expForNext: levelData.expForNext,
        expInLevel: levelData.expInLevel
    });
}
));

// get recent budget
router.get('/recent/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const budgets = await Budget.find({user_id: userId})
    .sort({createdAt: -1})
    .limit(5)

    res.json(budgets)
}))

// export
export default router;
