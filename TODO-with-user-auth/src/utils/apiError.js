// Custom error class for API errors
// use this class to create error objects with a status code and message
// example: throw new ApiError(404, 'User not found');
// use extends Error to inherit from the built-in Error class
// use super(message) to set the error message
// add a statusCode property to store the HTTP status code for the error


class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
// captureStackTrace is a method of the Error class that creates a stack trace for the error object
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;