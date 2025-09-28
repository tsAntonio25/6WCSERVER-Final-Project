// imports
import jwt from 'jsonwebtoken';
import { User } from '../models/models.js';
import dotenv from 'dotenv';
dotenv.config();

// key
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in .env file");
}

// exports
// create token
export const generateToken = (payload) =>
  jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

// verify token middleware
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // decode and verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // check if user still exists
    const user = await User.findById(decoded.id);

    if(!user) {
      return res.status(401).json({error: "User not found"});
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({error: "Invalid or expired token"});
  }
};
