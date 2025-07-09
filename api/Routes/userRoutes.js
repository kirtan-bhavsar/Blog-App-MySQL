import express from "express";

import { editProfile } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", editProfile);

export default userRouter;
