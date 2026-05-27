const asyncHandler = (requestHandler)=>
{
    return async (req, res, next) =>
    {
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };
};

export default asyncHandler;

// This utility function, `asyncHandler`, is designed to wrap asynchronous route handlers in an Express application. It takes a request handler function as an argument and returns a new function that handles any errors that may occur during the execution of the request handler. If an error occurs, it will be passed to the next middleware function in the Express error handling chain using `next()`. This helps to simplify error handling in asynchronous route handlers and ensures that errors are properly propagated through the middleware stack.
// error will come in controller -> the asyncHandler will catch it -> and (next) will pass it to the error handling middleware in Express.