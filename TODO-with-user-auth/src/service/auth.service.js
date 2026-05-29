import ApiError from '../error/ApiError.js';
import User from '../model/user.model.js';

// service function for user registration
const registerUserSrvice = async ({ name, email, password }) => {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    // create new user
    const user = await User.create({ name, email, password });
    
// generate JWT token for the new user
    const token = user.generateAuthToken();
// return user data without password and the token
    const safeUser = await User.findById(user._id).select("-password");
// return the user data and token to the controller
    return { 
        user: safeUser, 
        token, 
    };
};

// service function for user login
// service/auth.service.js
const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }
// isPasswordCorrect() is a method defined in the user model that compares the provided password with the hashed password stored in the database. It returns true if the passwords match and false otherwise.
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = user.generateAccessToken();
// safeUser is the user data that will be returned to the client, excluding sensitive information like the password. We use the select("-password") method to exclude the password field from the user data before sending it back to the client.
  const safeUser = await User.findById(user._id).select("-password");

  return {
    user: safeUser,
    token,
  };
};






export { registerUserSrvice, loginUserService };