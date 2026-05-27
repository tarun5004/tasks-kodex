class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// This `ApiError` class extends the built-in `Error` class in JavaScript. It is designed to represent errors that occur in an API context. The constructor takes several parameters:
// - `statusCode`: The HTTP status code associated with the error (e.g., 400 for Bad Request, 500 for Internal Server Error).
// - `message`: A human-readable message describing the error (default is "Something went wrong").
// - `errors`: An array to hold any additional error details (default is an empty array).
// - `stack`: An optional parameter to provide a custom stack trace (if not provided, it will capture the current stack trace).
// the captureStackTrace method is used to create a stack trace for the error, which can be helpful for debugging purposes. The `ApiError` class also includes properties such as `data`, `success`, and `errors` to provide additional context about the error when it is thrown and handled in the application.

export default ApiError;