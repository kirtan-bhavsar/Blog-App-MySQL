import express from "express";

import { login, register, logout } from "../Controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/logout", logout);

export default authRouter;
