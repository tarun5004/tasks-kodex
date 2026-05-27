import express from "express";
import { 
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
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
router.delete("/:id", validateTodoId, deleteTodo);

export default router;
