import { Router } from "express";
import { verifyJwtToken } from "../../middleware/auth.middleware";
import { signUp, signIn, deleteUser, resetPassword } from "../controllers/users/users.controllers";
import { upload } from "../../helpers/users.uploads.helpers";
const userRouter = Router();

userRouter.post("/sign-up", upload.single("profileImage"), signUp);
userRouter.post("/sign-in", signIn);
userRouter.delete("/delete", verifyJwtToken, deleteUser);
userRouter.patch("/reset-password", verifyJwtToken, resetPassword);

export default userRouter;
