import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createNoteController } from '../controller/notes.controller.js';



let router = express.Router();

router.post('/add', protect, createNoteController);

export default router;
