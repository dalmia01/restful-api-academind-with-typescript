import { Schema, model } from "mongoose";
import { IUser } from "../types/users.types";

const UserSchema: Schema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        notes: [{ type: Schema.Types.ObjectId, ref: "notes" }],
    },
    { timestamps: true }
);

export default model<IUser>("User", UserSchema);
