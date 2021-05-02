import { genSalt, hash } from "bcrypt";

export const hashPassword = async (password: string) => {
    const salt = await genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
};
