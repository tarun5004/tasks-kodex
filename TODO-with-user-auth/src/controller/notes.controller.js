import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { createNoteService } from '../service/notes.service.js';

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
        .json(new ApiResponse(201, note, "Note created successfully"));
});

export { createNoteController }