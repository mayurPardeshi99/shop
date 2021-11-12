import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  if (process.env.NODE_ENV === "development") {
    try {
      const conn = await mongoose.connect(process.env.DB_URL);
      console.log(`mongodb connectd: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
