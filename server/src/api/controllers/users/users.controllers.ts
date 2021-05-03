import { Request, Response } from "express";
import { IUser } from "../../types/users.types";
import UserModel from "../../models/users.models";
import { hashPassword, assignJWTAccessToken, verifyPassword } from "../../../helpers/common.helpers";

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

export const signIn = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<IUser, "username" | "password">;
    const { username, password } = body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error("user does not exist");
        }
        const isPasswordVerified = await verifyPassword(password, user.password);

        if (!isPasswordVerified) {
            throw new Error("wrong credentials");
        }

        const jwtAccessToken = assignJWTAccessToken(username, user.id);

        if (!jwtAccessToken) {
            throw new Error("Some error occured. Please try again!");
        }

        res.json({
            message: "login successfull",
            jwtAccessToken,
        });
    } catch (err) {
        res.json({ error: err.message || "Some error occured. Please try again!" });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<IUser, "username">;
    const { username } = body;

    try {
        const user = await UserModel.deleteOne({ username });

        if (!user) {
            throw new Error();
        }

        switch (user.deletedCount) {
            case 0:
                throw new Error("user do not exist");
            case 1:
                res.json({ message: `username -- ${username}:: user deleted successfully` });
                break;
        }
    } catch (err) {
        res.json({ error: err.message || "Some error occured. Please try again!" });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<IUser, "username" | "password" | "new_password">;
    const { username, password, new_password } = body;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) throw new Error("user does not exist");

        const isUserVerified = await verifyPassword(password, user.password);

        if (!isUserVerified) throw new Error("wrong credentials!");

        const hashedPassword = await hashPassword(new_password);

        if (!hashedPassword) throw new Error("Some error occured, while hashing!");

        const modifiedUser = await UserModel.findOneAndUpdate({ username }, { password: hashedPassword });

        if (!modifiedUser) throw new Error("Some error occured while modifying password");

        res.json({ message: "Password modified successfully" });
    } catch (err) {
        res.json({ error: err.message || "Some error occured. Please try again!" });
    }
};
