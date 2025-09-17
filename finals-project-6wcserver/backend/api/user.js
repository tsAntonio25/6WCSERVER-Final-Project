// imports
import express from 'express';
import {User} from '../models/models.js';

const router = express.Router();

// Create user
router.post('/', async (req,res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});

// Read all users
router.get('/', async (req,res) => {    
    const users = await User.find();
    res.json(users);
})

// Read specific user
router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({error: 'User not found'});
    res.json(user);
});

// Update user
router.put('/:id', async (req,res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,});

    if (!updated) return res.status(404).json({error: 'User not found'});
    res.json(updated);
});

export default router;