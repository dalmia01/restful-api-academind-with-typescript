import { Router } from "express";
import { verifyJwtToken } from "../../middleware/auth.middleware";
import { getAllNotes, getAllNotesOfParticularUser, addNote, getNote, modifyNote, deleteNote } from "../controllers/notes/notes.controllers";

const notesRouter = Router();

notesRouter.get("/", getAllNotes);

notesRouter.get("/:userId", verifyJwtToken, getAllNotesOfParticularUser);

notesRouter.post("/", addNote);

notesRouter.get("/specific-note/:noteId", getNote);

notesRouter.patch("/:noteId", modifyNote);

notesRouter.delete("/:noteId", deleteNote);

export default notesRouter;
