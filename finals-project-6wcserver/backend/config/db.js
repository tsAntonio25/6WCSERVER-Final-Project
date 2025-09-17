import mongoose from "mongoose";

const dbURI = process.env.MONGO_URI;

const connectDB = () => {
    mongoose.connect(dbURI)
    .then(() => {
        console.log("Successfully connected to iponlyDB")
    })
    .catch(err => {
        console.error("Error connecting to iponlyDB: ", err)
        process.exit(1);
    });
}

export default connectDB;