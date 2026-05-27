import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/Api.response.js";
import Todo from "../models/todo.model.js";


const createTodo = asyncHandler(async (req, res) => {
  const {title, description} = req.body;

  const todo = await Todo.create({ title, description });

  res
    .status(201)
    .json(new ApiResponse(201, "Todo created successfully", todo));
});

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();

  res
    .status(200)
    .json(new ApiResponse(200, "Todos fetched successfully", todos));
});

const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Todo fetched successfully", todo));
});

const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Todo updated successfully", todo));
});

export { createTodo, getTodos, getTodoById, updateTodo };
