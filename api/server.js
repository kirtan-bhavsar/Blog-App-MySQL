import express from "express";
import dotenv from "dotenv/config";
import db from "./db.js";
import authRouter from "./Routes/authRoutes.js";
import postRouter from "./Routes/postRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
// import cors from "cors";

const app = express();

db;

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "API Running successfully on port 5060" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.listen(port, () => {
  console.log(`App running successfully on port ${port}`);
});
