import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });
const uri = process.env.MONGODB_ATLAS;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to Database");
  } catch (error) {
    console.error(`Error connecting to MongoDB`);
    process.exit(1);
  }
};

export default connectDB;
