import { Schema, model } from "mongoose";
import { INote } from "../types/notes.types";

const NotesSchema: Schema = new Schema({
    title: String,
    description: String,
    label: [String],
    user: { type: Schema.Types.ObjectId, ref: "users" },
});

export default model<INote>("Note", NotesSchema);
