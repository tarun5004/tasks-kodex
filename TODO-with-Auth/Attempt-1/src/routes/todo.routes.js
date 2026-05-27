import express from "express";
import { getTodo, getTodoById } from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getTodo);
router.get("/:id", getTodoById);

export default router;