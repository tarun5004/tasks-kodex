import Note from "../models/notes.model";

// note service for creating a note
const createNoteService = async ({title, content, userId}) => {
    const note = await Note.create({
        title,
        content,
        owner: userId,
    });
    return note;
}

export {createNoteService}