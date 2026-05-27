import ApiError from '../utils/ApiError.js';



const notFound = (req, res, next) => {
    next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};

export default notFound;
// This middleware function, `notFound`, is designed to handle requests that do not match any defined routes in an Express application. When a request is made to an undefined route, this middleware will create a new `ApiError` with a status code of 404 and a message indicating that the requested URL was not found. The error is then passed to the next middleware function in the Express error handling chain using `next()`. This allows for centralized error handling and ensures that clients receive a consistent response for undefined routes.