import { Document, ObjectId } from "mongoose";
import { IUser } from "./users.types";

export interface IRequestNote extends Document {
    userId: IUser["_id"];
    title?: string;
    description: string;
    label?: string[];
}

export interface INote extends Document {
    title?: string;
    description: string;
    label?: string[];
    user: IUser["_id"];
}
