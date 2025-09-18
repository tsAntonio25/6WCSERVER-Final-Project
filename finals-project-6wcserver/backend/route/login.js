// imports
import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { User } from '../models/models.js';
import { generateToken } from '../modules/auth.js';

const router = express.Router();

// Read Account
router.post('/login', asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    // check if user exists
    const user = await User.findOne({email});
    if (!user) throw new Error("Invalid email or password");

    // check if password is the same as the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    // generate token
    const token = generateToken({ id: user._id, username: user.username })
    
    res.json({ message: "Login successful", userId: user._id, username: user.username, token });
}));

export default router;
