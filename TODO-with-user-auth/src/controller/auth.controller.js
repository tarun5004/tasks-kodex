//auth controller 
// handles user authentication and authorization
// includes functions for login, logout, and registration
// uses JWT for token-based authentication
// uses bcrypt for password hashing
// interacts with the user model to access the database



import asyncHandler from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    
})