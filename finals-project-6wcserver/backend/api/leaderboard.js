//imports
import express from 'express';
import {User} from '../models/models.js';

const router = express.Router();

// Read leaderboard (sorted by exp and lvl)
router.get("/", async (req, res) => {
    const leaderboard = await User.find({}, "username level exp").sort({ exp: -1 , level: -1});
    res.json(leaderboard);
});

export default router;
