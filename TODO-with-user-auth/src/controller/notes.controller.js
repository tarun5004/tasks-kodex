import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { createNoteService, getMyNotesService } from '../service/notes.service.js';

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

export { createNoteController, getMyNotesController }
