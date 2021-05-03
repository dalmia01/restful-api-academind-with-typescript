import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
};

export const verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
    const isVerified = await compare(inputPassword, hashedPassword);
    return isVerified;
};

export const assignJWTAccessToken = (username: string): string => {
    const jwtAccessToken = sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });
    return jwtAccessToken;
};
