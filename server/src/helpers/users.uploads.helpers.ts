import { Request } from "express";
import multer, { diskStorage } from "multer";

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        const date = new Date().getTime();
        cb(null, `${date}---${req.body.username}---${file.originalname}`);
    },
});

const fileFilter = (req: Request, file: any, cb: Function) => {
    if (["image/jpeg", "image/jpg", "image/png"].indexOf(file.mimetype) > -1) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
