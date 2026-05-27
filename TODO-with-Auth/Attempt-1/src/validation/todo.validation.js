import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";

const validateTodoId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new ApiError(400, "Invalid todo id");
  }

  next();
};

const validateCreateTodo = (req, res, next) => {
  const { title, description } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  if (typeof title !== "string") {
    throw new ApiError(400, "Title must be a string");
  }

  if (title.trim().length < 3) {
    throw new ApiError(400, "Title must be at least 3 characters");
  }

  if (title.trim().length > 100) {
    throw new ApiError(400, "Title cannot be more than 100 characters");
  }

  if (description && typeof description !== "string") {
    throw new ApiError(400, "Description must be a string");
  }

  next();
};

const validateUpdateTodo = (req, res, next) => {
  const { title, description, completed } = req.body;

  if (
    title === undefined &&
    description === undefined &&
    completed === undefined
  ) {
    throw new ApiError(400, "At least one field is required to update");
  }

  if (title !== undefined) {
    if (typeof title !== "string") {
      throw new ApiError(400, "Title must be a string");
    }

    if (title.trim().length < 3) {
      throw new ApiError(400, "Title must be at least 3 characters");
    }
  }

  if (description !== undefined && typeof description !== "string") {
    throw new ApiError(400, "Description must be a string");
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    throw new ApiError(400, "Completed must be true or false");
  }

  next();
};

export { validateTodoId, validateCreateTodo, validateUpdateTodo };
