import Note from "../models/notes.model.js";
import ApiError from "../utils/ApiError.js";

// note service for creating a note
const createNoteService = async ({title, content, userId}) => {
    const note = await Note.create({
        title,
        content,
        owner: userId,
    });
    return note;
}

// Fetch only notes that belong to the logged-in user.
const getMyNotesService = async (userId) => {
    const notes = await Note.find({ owner: userId }).sort({ createdAt: -1 });
    return notes;
}

// Find one note only when it belongs to the logged-in user.
const getNoteByIdService = async ({ noteId, userId }) => {
    const note = await Note.findOne({ _id: noteId, owner: userId });

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return note;
}

export {createNoteService, getMyNotesService, getNoteByIdService}
