// middleware/auth.middleware.js
// middleware for protecting routes that require authentication
// checks for valid JWT token in the Authorization header
// if token is valid, attaches user information to the request object
// if token is invalid or missing, throws an error


import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";


// protect is a middleware function that checks for a valid JWT token in the Authorization header of the incoming request. If the token is valid, it decodes the token to get the user ID, retrieves the user from the database, and attaches the user information to the request object. If the token is invalid or missing, it throws an error with a status code of 401 (Unauthorized).
const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

//   The middleware first checks if the Authorization header is present and starts with "Bearer ". If not, it throws an error indicating that an access token is required. If the header is valid, it extracts the token from the header, verifies it using the JWT secret, and retrieves the user information from the database based on the user ID decoded from the token. If the user is found, it attaches the user information to the request object and calls next() to pass control to the next middleware or route handler. If any of these steps fail (e.g., invalid token, user not found), it throws an error with a status code of 401 (Unauthorized).
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access token is required");
  }
// The token is expected to be in the format "Bearer <token>", so we split the header and take the second part to get the actual token string.
  const token = authHeader.split(" ")[1];
// jwt.verify() is used to verify the token against the secret key. If the token is valid, it returns the decoded payload, which contains the user ID and email. We then use this information to find the user in the database and attach it to the request object for use in subsequent middleware or route handlers.
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
// After verifying the token, we use the decoded user ID to find the corresponding user in the database. We select all fields except the password (using select("-password")) to ensure that sensitive information is not included in the request object. If the user is not found, we throw an error indicating that the access token is invalid.
  const user = await User.findById(decoded._id).select("-password");
// If the user is not found in the database, it means that the token is valid but the user no longer exists (e.g., deleted account), so we throw an error indicating that the access token is invalid.
  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  req.user = user;

  next();
});

export { protect };