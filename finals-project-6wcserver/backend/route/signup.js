// imports
import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { User } from '../models/models.js';

const router = express.Router();

// Create Account
router.post('/signup', asyncHandler(async (req, res) => {
    // is_admin not included
    const {username, email, password, confirmPassword } = req.body;

    // throw error
    if (password !== confirmPassword) throw new Error("Passwords do not match") 

    // check if user already exists
    const existing = await User.findOne({email});
    if (existing) throw new Error("Email already registered")

    // password encryption
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({username, email, password: hashed});
    if (!user) throw new Error("Unable to create account")
    await user.save();

    res.json({message: "Sign Up successful", userId: user._id, username: user.username});
}));

export default router;
