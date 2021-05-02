import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { INote, IRequestNote } from "../../types/notes.types";
import NoteModel from "../../models/notes.models";
export const getAllNotes = async (req: Request, res: Response) => {
    res.json({
        message: "getting all notes from controllers",
    });
};

export const addNote = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<IRequestNote, "title" | "description" | "label" | "userId">;

    const { title, description, label, userId } = body;

    const addNote = new NoteModel({});
    addNote.title = title;
    addNote.description = description;
    addNote.label = label || [];
    addNote.user = userId;

    await addNote.save();

    res.json({ message: "note added" });
};

export const getNote = async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    res.json({
        message: `get specific note details for ${noteId}`,
    });
};

export const modifyNote = async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    res.json({
        message: `${noteId} - this note is now modified`,
    });
};

export const deleteNote = async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    res.json({
        message: `${noteId} -- this product is now deleted`,
    });
};
