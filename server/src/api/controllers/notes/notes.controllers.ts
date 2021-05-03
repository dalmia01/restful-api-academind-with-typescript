import { Request, Response } from "express";
import { IRequestNote } from "../../types/notes.types";
import NoteModel from "../../models/notes.models";

export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const notes = await NoteModel.find().select("label title description user");
        if (notes.length < 1) {
            res.json({ mesage: "no notes found!" });
        }
        res.json({ message: "all notes", notes });
    } catch (err) {
        res.json({
            error: err.message || "some error occured, while getting all notes!",
        });
    }
};

export const getAllNotesOfParticularUser = async (req: Request, res: Response) => {
    try {
        const notes = await NoteModel.find({ user: req.params.userId }).select("label title description user");
        if (notes.length < 1) {
            res.json({ mesage: "no notes found!" });
        }
        res.json({ message: "all notes of a user", notes });
    } catch (err) {
        res.json({
            error: err.message || "some error occured, while getting all notes!",
        });
    }
};

export const addNote = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<IRequestNote, "title" | "description" | "label" | "userId">;

    const { title, description, label, userId } = body;

    try {
        const addNote = new NoteModel({});
        addNote.title = title;
        addNote.description = description;
        addNote.label = label || [];
        addNote.user = userId;

        await addNote.save();

        res.json({ message: "note added" });
    } catch (err) {
        res.json({ error: err.message || "some error occured while adding a note" });
    }
};

export const getNote = async (req: Request, res: Response) => {
    const noteId = req.params.noteId;

    try {
        const note = await NoteModel.findById(noteId).select("title description label user");

        if (!note) throw new Error("note not found!");

        res.json({
            mesage: "get a specific note",
            note,
        });
    } catch (err) {
        res.json({ error: err.message || "some error while fetching specific note" });
    }
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
