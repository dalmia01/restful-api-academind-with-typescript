import { Router } from "express";
import { signUp } from "../controllers/users/users.controllers";

const userRouter = Router();

userRouter.post("/sign-up", signUp);

export default userRouter;
