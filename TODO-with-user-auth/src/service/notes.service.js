import Note from "../models/notes.model.js";

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

export {createNoteService, getMyNotesService}
