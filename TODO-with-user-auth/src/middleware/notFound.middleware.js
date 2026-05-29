// not found middleware
// this middleware will catch any requests that do not match any routes and send a 404 response
// use this middleware after all the routes in the app.js file

import ApiError from "../utils/ApiError.js";

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export default notFound;