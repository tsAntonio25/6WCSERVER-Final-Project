// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { User } from '../models/models.js';
import { verifyToken } from '../modules/auth.js';

const router = express.Router();

// leaderboard reset
router.post('/leaderboard/reset', verifyToken, asyncHandler(async (req, res) => {
    if (!req.user.is_admin) {
        throw new Error('Admin privileges required');
    }
    
    const result = await User.updateMany(
        { is_admin: false },
        { $set: { exp: 0, level: 1, streak: 1 }}
    )
    
    res.json({ message: 'Leaderboard has been reset successfully.' })
}));

// get all users (for admin user access control)
router.get('/users', verifyToken, asyncHandler(async (req, res) => {
    if (!req.user.is_admin) {
        throw new Error('Admin privileges required');
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const search = req.query.search || ''

    // search by username by query input, if no input empty filter
    const filter = search ? { username : { $regex: search, $options: 'i'} } : {};

    const total = await User.countDocuments(filter);

    const users = await User.find(filter, 'username createdAt is_admin')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total/limit),
        users
    });
}));

// admin permissions update
router.patch('/users/:id/toggle-admin', verifyToken, asyncHandler(async (req, res) => {
     if (!req.user.is_admin) {
        throw new Error('Admin privileges required');
    }

    const userId = req.params.id;

    // safe guard (to prevent nav guard from kicking out admin in admin dashboard)
    if (req.user._id.toString() === userId){
        throw new Error('You cannot change your own admin status')
    }

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found.')

    // update is_admin (true <=> false)
    user.is_admin = !user.is_admin;
    await user.save();

    res.json({ message: `User ${user.username} is now ${user.is_admin? 'an admin' : 'a regular user'}`})
}))

export default router