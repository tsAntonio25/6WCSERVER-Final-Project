// imports
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from "./config/db.js";

// import api operations
import expense from './route/expense.js';
import budget from './route/budget.js';
import user from './route/user.js';
import signup from './route/signup.js';
import login from './route/login.js';
import computation from './route/computation.js'
import leaderboard from './route/leaderboard.js'
import admin from './route/admin.js'
import transactions from './route/transactions.js'


const app = express();
const router = express.Router()
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors({
    origin: process.env.NODE_ENV === "production"
            ? "https://iponly.vercel.app"
            : "http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); 

// database connection
dotenv.config();

connectDB();

// API routes
router.use("/signup", signup);
router.use("/login", login); 
router.use("/expense", expense);
router.use("/budget", budget);
router.use("/user", user);
router.use("/compute", computation);
router.use("/leaderboard", leaderboard);
router.use("/admin", admin);
router.use("/transactions", transactions)

app.use("/", router)

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(404).json({error: err.message})
})

// listen
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;