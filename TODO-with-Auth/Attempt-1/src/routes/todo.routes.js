import express from "express";
import { 
    createTodo,
    getTodos 
} from "../controllers/todo.controller.js";

import { 
    validateCreateTodo,
    validateUpdateTodo
} from "../middlewares/validation.middleware.js";


const router = express.Router();


router.post("/create", validateCreateTodo, createTodo);
router.get("/", getTodos);
// router.get("/:id", getTodoById);

export default router;
