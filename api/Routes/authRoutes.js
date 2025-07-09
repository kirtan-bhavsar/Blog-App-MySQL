import express from "express";

import { login } from "../Controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/", login);

export default authRouter;
