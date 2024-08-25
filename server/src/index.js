import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
