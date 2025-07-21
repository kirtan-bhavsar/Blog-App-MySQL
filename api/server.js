import express from "express";
import dotenv from "dotenv/config";
import db from "./db.js";
import authRouter from "./Routes/authRoutes.js";
import postRouter from "./Routes/postRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import multer from "multer";
// import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/v1/upload", upload.single("file"), function (req, res, next) {
  const file = req.file;
  res.status(200).send(file.filename);
});

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

// Finally completed by adding the following functionalities :
// -> Generic Pagination
// -> Dynamic/Ellipsis Pagination
// -> Like/Unlike functionality
// -> Different options to sort the posts
// -> displays the like and comment count
// -> option to add comment by the user
// -> displaying all the blog's comment
// -> option to delete a blog comment
