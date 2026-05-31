import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { createNoteService, getMyNotesService, getNoteByIdService, updateNoteService, deleteNoteService } from '../service/notes.service.js';

// controller for creating a note
const createNoteController = asyncHandler(async (req, res) =>{
    // create a note using the service
    const note = await createNoteService({
        // get the title and content from the request body and userId from the authenticated user
        title: req.body.title,
        content: req.body.content,
        userId: req.user._id,
    });
// send the response with the created note
    res
        .status(201)
        .json(new ApiResponse(201, "Note created successfully", note));
});

// controller for listing notes owned by the logged-in user
const getMyNotesController = asyncHandler(async (req, res) => {
    const notes = await getMyNotesService(req.user._id);

    res
        .status(200)
        .json(new ApiResponse(200, "Notes fetched successfully", notes));
});

// controller for fetching a single note owned by the logged-in user
const getNoteByIdController = asyncHandler(async (req, res) => {
    const note = await getNoteByIdService({
        noteId: req.params.id,
        userId: req.user._id,
    });

    res
        .status(200)
        .json(new ApiResponse(200, "Note fetched successfully", note));
});

// controller for updating a note owned by the logged-in user
const updateNoteController = asyncHandler(async (req, res) => {
    const note = await updateNoteService({
        noteId: req.params.id,
        userId: req.user._id,
        updates: req.body,
    });

    res
        .status(200)
        .json(new ApiResponse(200, "Note updated successfully", note));
});

// controller for deleting a note owned by the logged-in user
const deleteNoteController = asyncHandler(async (req, res) => {
    const note = await deleteNoteService({
        noteId: req.params.id,
        userId: req.user._id,
    });

    res
        .status(200)
        .json(new ApiResponse(200, "Note deleted successfully", note));
});

export { createNoteController, getMyNotesController, getNoteByIdController, updateNoteController, deleteNoteController }
