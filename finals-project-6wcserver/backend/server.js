// imports
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from "./config/db.js";

// import api operations
import expense from './route/expense.js';
import budget from './route/budget.js';
import user from './route/user.js';
import leaderboard from './route/leaderboard.js';
import signup from "./route/signup.js";
import login from "./route/login.js";



const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors())
app.use(express.json()); 

// database connection
dotenv.config();

connectDB();

// API routes
app.use("/signup", signup);
app.use("/login", login); 
app.use("/expense", expense);
app.use("/budget", budget);
app.use("/user", user);
app.use("/leaderboard", leaderboard);

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(404).json({error: err.message})
})

// listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));