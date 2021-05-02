import { Router } from "express";
import { getAllNotes, addNote, getNote, modifyNote, deleteNote } from "../controllers/notes/notes.controllers";

const notesRouter = Router();

notesRouter.get("/", getAllNotes);

notesRouter.post("/", addNote);

notesRouter.get("/:noteId", getNote);

notesRouter.patch("/:noteId", modifyNote);

notesRouter.delete("/:noteId", deleteNote);

export default notesRouter;
