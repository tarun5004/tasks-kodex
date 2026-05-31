import express from 'express';
import { registerUser, loginUser } from '../controller/auth.controller.js';
import {
    validateRegister, 
    validateLogin
} from '../validation/auth.validation.js';

let router = express.Router();
// the router defines two routes for user registration and login. 
// The /register route is a POST request that calls the registerUser controller function, 
// which handles user registration by creating a new user in the database and returning a response 
// with the created user data. The /login route is also a POST request that calls the loginUser controller function, 
// which handles user authentication by verifying the user's credentials and returning a response with a JWT token 
// if the login is successful. These routes allow users to create accounts and log in to access protected resources in the application.
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);



export default router;
