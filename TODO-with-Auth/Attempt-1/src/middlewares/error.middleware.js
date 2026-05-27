const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Development error handling only
    console.log(err.stack);

    if(err.name === "CastError"){
        statusCode = 400;
        message = "Invalid ID format";
    }

    if(err.name === "ValidationError"){
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(", ");
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        data: null
    });

}

export default errorHandler;

// The `errorHandler` function is an Express middleware function designed to handle errors that occur during the processing of requests. It takes four parameters: `err`, `req`, `res`, and `next`. The function first determines the appropriate HTTP status code and error message based on the properties of the error object (`err`). It also includes specific handling for certain types of errors, such as `CastError` (which indicates an invalid ID format) and `ValidationError` (which aggregates validation error messages). Finally, it sends a JSON response to the client with the error details, including a success flag, status code, message, and null data. This centralized error handling approach helps to ensure consistent error responses across the application.