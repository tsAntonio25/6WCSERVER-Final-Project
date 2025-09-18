// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { User } from '../models/models.js';

// import bcrypt for password hashing?? 

const router = express.Router();

// Create Account
router.post('/', asyncHandler(async (req, res) => {
    // is_admin not included
    const { first_name, last_name, username, email, password, confirmPassword } = req.body;

    // throw error
    if (password !== confirmPassword) throw new Error("User not found") 

    // check if user already exists
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already registered")

    // password encryption
    // here
    
    const user = new User({first_name, last_name, username, email, password});
    if (!user) throw new Error("Unable to create account") 
    res.json(user);
}));
