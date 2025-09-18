// imports
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

// key
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

// exports
// create token
export const generateToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

// decode t
export const verifyToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw new Error("No token provided");

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) { return next(new Error("Invalid token")) };
        req.user = decoded;
        next();
        
  });
});
