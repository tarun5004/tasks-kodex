// ApiResponse.js for standardizing API responses across the application
// use this class to create response objects with a status code, message, and data
// example: return new ApiResponse(200, 'User created successfully', user);

class ApiResponse {
  constructor(statusCode, message = "Success", data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;

// use like this in your controllers:
// res.status(200).json(
//   new ApiResponse(200, "User registered successfully", user)
// );