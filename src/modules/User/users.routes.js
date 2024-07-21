import { Router } from "express";
import { signin, signup } from "./user.controller.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

export default userRouter