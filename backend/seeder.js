import dotenv from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import Order from "./models/orderSchema.js";
import Product from "./models/productSchema.js";
import User from "./models/userSchema.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUserId = await createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUserId };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data inserted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data deleted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
