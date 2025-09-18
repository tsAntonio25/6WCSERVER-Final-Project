// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { User } from '../models/models.js';

const router = express.Router();

// Create user
router.post('/', asyncHandler(async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
}));

// Read all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
}));

// Read specific user
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    // throw error
    if (!user) throw new Error("User not found") 
    res.json(user);
}));

// Update user
router.put('/:id', asyncHandler(async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,});

    // throw error
    if (!updated) throw new Error("User not found") 
    res.json(updated);
}));

// export
export default router;