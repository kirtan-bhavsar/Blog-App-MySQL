import { addPost } from "../Controllers/postController.js";

import express from "express";

const postRouter = express.Router();

postRouter.get("/", addPost);

export default postRouter;
