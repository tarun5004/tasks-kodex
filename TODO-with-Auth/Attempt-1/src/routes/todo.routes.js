import express from "express";
import { 
    createTodo,
    getTodos,
    getTodoById,
    updateTodo
} from "../controllers/todo.controller.js";

import { 
    validateTodoId,
    validateCreateTodo,
    validateUpdateTodo
} from "../validation/todo.validation.js";


const router = express.Router();


router.post("/create", validateCreateTodo, createTodo);
router.get("/", getTodos);
router.get("/:id", validateTodoId, getTodoById);
router.patch("/:id", validateTodoId, validateUpdateTodo, updateTodo);

export default router;
