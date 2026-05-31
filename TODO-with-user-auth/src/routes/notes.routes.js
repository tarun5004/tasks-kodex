import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createNoteController, getMyNotesController, getNoteByIdController, updateNoteController, deleteNoteController } from '../controller/notes.controller.js';



let router = express.Router();

router.post('/add', protect, createNoteController);
router.get('/', protect, getMyNotesController);
router.get('/:id', protect, getNoteByIdController);
router.patch('/:id', protect, updateNoteController);
router.delete('/:id', protect, deleteNoteController);

export default router;
