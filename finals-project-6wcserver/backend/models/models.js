// import
import mongoose from 'mongoose';

// ---------------------------------
// User Model
const userSchema = new mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        exp: {type: Number, default: 0},
        streak: {type: Number, default: 0},
        level: {type: Number, default: 1},
        allowance_type: {type: String, enum:["daily","weekly","monthly"]},
        is_admin: {type: Boolean, default: false},
        anon_username: {type: String, unique: true}
    },
    // to record created and updateddate automatically
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema);

// ---------------------------------


// Finance Model
// 1. expense model
const expenseSchema = new mongoose.Schema({
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        finance_type: {type: String, default: "expense"},
        type: {type: String, enum: ["food","transportation","leisure","others"], required: true},
        expense: {type: Number, required: true},
        date: {type: Date, default: Date.now}
    },
    {
        collection: "finance"
    }
);

export const Expense = mongoose.model("Expense", expenseSchema);

// 2. budget model
const budgetSchema = new mongoose.Schema({
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        finance_type: {type: String, default: "budget"},
        amount: {type: Number, required: true},
        createdAt: {type: Date, default: Date.now}
    },
    {
        collection: "finance"
    }
);

export const Budget = mongoose.model("Budget", budgetSchema);

// ---------------------------------


// Leaderboard Model
const leaderboardSchema = new mongoose.Schema({
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        username: {type: String, required: true},
        level: {type: Number, default: 1},
        exp: {type: Number, default: 0}
    },
    {
        timestamps: true
    }
);

export const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

//---------------------------------


