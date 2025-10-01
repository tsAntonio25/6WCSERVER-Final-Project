// imports
import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { User } from '../models/models.js';
import { generateToken } from '../modules/auth.js';
import { handleStreak } from "../modules/streak.js";


const router = express.Router();

// Read Account
// changed route to /
router.post('/', asyncHandler(async (req,res) => {
    // test lang ng req.body
    console.log('Request body:', req.body); 
    const {email, password} = req.body;

    // check if user exists
    const user = await User.findOne({email});
    if (!user) throw new Error("Invalid email or password");

    // check if password is the same as the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");


    // handle streak
    const streakResult = await handleStreak(user);

    // generate token
    const token = generateToken({ id: user._id, username: user.username, is_admin: user.is_admin })
    
    const responseData = { 
        message: "Login successful", 
        userId: user._id, 
        username: user.username,
        is_admin: user.is_admin,
        token,
        streak: streakResult.streak,
        expGained: streakResult.expGained,
        level: streakResult.level,
    };

    // verify data
    console.log("Login response:", responseData); 
    res.json(responseData);
}));

export default router;
