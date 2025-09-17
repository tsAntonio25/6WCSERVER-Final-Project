// imports
import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json()); 

// database connection
dotenv.config();
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

connectDB();

// API routes
// test route kung gumagana db connection
app.get("/", (req, res) => {
  res.send("API is working and DB connection attempted!");
});


// listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));