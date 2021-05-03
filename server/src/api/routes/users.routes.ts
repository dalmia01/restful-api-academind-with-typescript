import { Request, Router } from "express";
import { verifyJwtToken } from "../../middleware/auth.middleware";
import { signUp, signIn, deleteUser, resetPassword } from "../controllers/users/users.controllers";
import multer, { diskStorage } from "multer";
const userRouter = Router();

const storage = diskStorage({
    destination: (_, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.username}-${file.originalname}`);
    },
});

const fileFilter = (req: Request, file: any, cb: any) => {
    if (["image/jpg", "image/jpeg", "image/png"].indexOf(file.mimetype) > -1) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

userRouter.post("/sign-up", upload.single("profileImage"), signUp);
userRouter.post("/sign-in", signIn);
userRouter.delete("/delete", verifyJwtToken, deleteUser);
userRouter.patch("/reset-password", verifyJwtToken, resetPassword);

export default userRouter;
