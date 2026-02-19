import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectToDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    console.log("Mongo connection is successfully established");
  } catch (error) {
    console.error("MongoDB connnection error");
    console.error(error);
    process.exit(1);
  }
}
