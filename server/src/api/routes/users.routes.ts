import { Router } from "express";
import { verifyJwtToken } from "../../middleware/auth.middleware";
import { signUp, signIn, deleteUser, resetPassword } from "../controllers/users/users.controllers";

const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);
userRouter.delete("/delete", verifyJwtToken, deleteUser);
userRouter.patch("/reset-password", verifyJwtToken, resetPassword);

export default userRouter;
