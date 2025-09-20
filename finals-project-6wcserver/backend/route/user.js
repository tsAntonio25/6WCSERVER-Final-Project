// imports
import express from 'express';
import asyncHandler from 'express-async-handler'
import { User } from '../models/models.js';
import { verifyToken } from '../modules/auth.js';


const router = express.Router();

//-------------------------------
// Create user
router.post('/', asyncHandler(async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
}));


//-------------------------------
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


//-------------------------------
// Update user
router.put('/:id', asyncHandler(async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,});

    // throw error
    if (!updated) throw new Error("User not found") 
    res.json(updated);
}));


//-------------------------------
// Delete (Self)
router.delete('/self/:id', verifyToken, asyncHandler(async (req, res) => {
    const target = req.params.id;

    // check if the logged in user matches the account
    if (req.user.id !== target) throw new Error("You can only delete your own account")

    const deleted = await User.findByIdAndDelete(target);
    if (!deleted) throw new Error("User not found");

    res.json({message: "Your account has been deleted"})
}));

// Delete (Admin)
router.delete('/admin/:id', verifyToken, asyncHandler(async (req, res) => {
    const target = req.params.id;

    // check if the requester is admin
    if(!req.user.is_admin) throw new Error("Not authorized. Admin only.");

    const deleted = await User.findByIdAndDelete(target);
    if (!deleted) throw new Error("User not found");

    res.json({message: "User deleted by admin"})
}));

// export
export default router;