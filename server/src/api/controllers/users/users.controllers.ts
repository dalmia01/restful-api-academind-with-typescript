import { Request, Response } from "express";
import { IUser } from "../../types/users.types";
import UserModel from "../../models/users.models";
import { hashPassword } from "../../../helpers/common.helpers";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<IUser, "username" | "email" | "password">;

    const { username, email, password } = body;

    try {
        const user = await UserModel.findOne({ username: username });

        if (user) {
            throw new Error("user already exists");
        }

        const hashedPassword = await hashPassword(password);

        let newUser: IUser | null = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        newUser = await newUser.save();

        res.json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            message: "user registered successfully",
        });
    } catch (err) {
        res.json({
            error: err.message || "Something went wrong. Try Again!",
        });
    }
};
