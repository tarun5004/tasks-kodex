// Validation functions for user registration and login
// checks for required fields and validates input format
// throws errors if validation fails

import ApiError from "../utils/ApiError.js";


// validation function for user registration
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

//   validate name, email and password format
  if (name.trim().length < 2) {
    throw new ApiError(400, "Name must be at least 2 characters");
  }

//   validate email format
  if (!email.includes("@")) {
    throw new ApiError(400, "Invalid email");
  }

//   validate password length
  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

//   if validation passes, call next middleware
  next();
};


// validation function for user login
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

//   check if email and password are provided
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  next();
};

export { validateRegister, validateLogin };