//auth controller 
// handles user authentication and authorization
// includes functions for login, logout, and registration
// uses JWT for token-based authentication
// uses bcrypt for password hashing
// interacts with the user model to access the database



// controller/auth.controller.js
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  registerUserService,
  loginUserService,
} from "../service/auth.service.js";


// controller function for user registration
const registerUser = asyncHandler(async (req, res) => {
  console.log("Registering user with data:", req.body);
  const result = await registerUserService(req.body);
// ApiResponse is a custom response format that includes status code, message, and data. It helps to maintain a consistent response structure across the application.
  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", result));
});


// controller function for user login
const loginUser = asyncHandler(async (req, res) => {
  const result = await loginUserService(req.body);
// the loginUser function is an asynchronous function that handles user login. It calls the loginUserService to authenticate the user and generate a token. If the login is successful, it returns a response with a status code of 200 and a message indicating that the user has logged in successfully, along with the user data and token.
  res
    .status(200)
    .json(new ApiResponse(200, "User logged in successfully", result));
});

export { registerUser, loginUser };