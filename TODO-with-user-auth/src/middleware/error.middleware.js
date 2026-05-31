// Error handling middleware
// this middleware will catch any errors thrown in the routes and send a response with the error message and status code
// it will also handle validation errors, duplicate key errors, and cast errors
// use this middleware after all the routes in the app.js file

const errorHandler = (err, req, res, next) => {
  console.error("ERROR NAME:", err.name);
  console.error("ERROR MESSAGE:", err.message);
  console.error("ERROR STACK:", err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  console.error("ERROR NAME:", err.name);
  console.error("ERROR MESSAGE:", err.message);
  console.error("ERROR STACK:", err.stack);

//   validation error is thrown by mongoose when the data does not match the schema
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

//   duplicate key error is thrown by mongoose when there is a unique index and the value already exists in the database
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

//   cast error is thrown by mongoose when the id is not a valid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid id";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;