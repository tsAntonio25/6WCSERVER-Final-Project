//imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { User } from '../models/models.js';

const router = express.Router();

// Read leaderboard (sorted by exp and lvl)
router.get("/", asyncHandler(async (req, res) => {
    const leaderboard = await User.find(
        {is_admin: false},
        "username anon_username level exp"
    )
    .sort({ exp: -1 , level: -1})
    .limit(10);

    res.json(leaderboard);

    //log leaderboard
    console.log(leaderboard);
}));

// Read Rank
router.get("/rank/:id", asyncHandler(async (req, res) => {
    const userId = req.params.id;

     // find  user
    const user = await User.findById(userId, 'username anon_username exp level');
    if (!user) throw new Error('User not found');

    if(user.is_admin) throw new Error('Admins are not ranked.')


    // compute ranking
    const rank = await User.countDocuments({
        is_admin: false,
        $or: [
            { exp: { $gt: user.exp } },
            { exp: user.exp, level: { $gt: user.level } }
        ]
    }) + 1;

    res.json({
        rank,
        user: {
            username: user.username,
            anon_username: user.anon_username,
            exp: user.exp,
            level: user.level
        }
    });

    // log userRank
    console.log(`User ${user.username}: Rank ${rank}`)
}));
// export
export default router;
