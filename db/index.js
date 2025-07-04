import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("MONGO_URI from env:", process.env.MONGO_URI);

try{
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected!");
} catch (error) {
  console.error("Error connecting to database:", error);
  process.exit(1);
}