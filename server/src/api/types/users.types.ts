import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    new_password?: string;
    notes?: string[] | ObjectId[];
}
