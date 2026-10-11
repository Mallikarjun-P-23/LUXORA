import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app.js";

const PORT = process.env.PORT || 8001;
const DB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

console.log(`Connecting to MongoDB at ${DB_URI}...`);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(" Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });