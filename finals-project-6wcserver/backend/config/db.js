// import
import mongoose from 'mongoose';

// async for database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to iponlyDB:", err.message);
    process.exit(1); 
  }
};

export default connectDB;
