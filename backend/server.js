import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadsRoutes from "./routes/uploadsRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/pay", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use("/api/upload", uploadsRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

app.use(notFoundHandler);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  5000,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
