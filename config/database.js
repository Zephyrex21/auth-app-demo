import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");

    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;   // ✅ FIXED: was 'connect' (wrong), now 'connectDB'
