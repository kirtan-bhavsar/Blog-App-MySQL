import {
  addPost,
  editPost,
  getPost,
  getPosts,
  deletePost,
} from "../Controllers/postController.js";

import express from "express";

const postRouter = express.Router();

postRouter.get("/", getPosts);

postRouter.get("/:id", getPost);

postRouter.put("/:id", editPost);

postRouter.delete("/;id", deletePost);

postRouter.post("/", addPost);

export default postRouter;
