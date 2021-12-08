import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      const conn = await mongoose.connect(process.env.DB_URL);
      console.log(`mongodb connectd: ${conn.connection.host}`);
    } else {
      await mongoose.connect(process.env.MONGO_URI);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
