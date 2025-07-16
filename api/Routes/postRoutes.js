import {
  addPost,
  editPost,
  getPost,
  getPosts,
  deletePost,
  like,
} from "../Controllers/postController.js";

import express from "express";

const postRouter = express.Router();

postRouter.get("/", getPosts);

postRouter.get("/:id", getPost);

postRouter.put("/:id", editPost);

postRouter.delete("/:id", deletePost);

postRouter.post("/", addPost);

postRouter.post("/like/:postId/:postedByUser", like);

export default postRouter;
