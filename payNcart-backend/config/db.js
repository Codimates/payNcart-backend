import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const mongoURL = process.env.REACT_APP_MONGO_URL;
        await mongoose.connect(mongoURL);
        console.log("DB connected");

        // Listen for connection lost events
        mongoose.connection.once("disconnected", () => {
            console.log("DB disconnected");
        });
        
    } catch (error) {
        console.error("DB connection error:", error);
    }
};

