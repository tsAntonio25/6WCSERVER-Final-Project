// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { User } from '../models/models.js';
import { verifyToken } from '../modules/auth.js';

const router = express.Router();

router.post('/leaderboard/reset', verifyToken, asyncHandler(async (req, res) => {
    if (!req.user.is_admin) {
        throw new Error('Admin privileges required');
    }
    
    const result = await User.updateMany(
        { is_admin: false },
        { $set: { exp: 0, level: 1, streak: 1 }}
    )
    
    res.json({ message: 'Leaderboard has been reset successfully.' })
}))

export default router