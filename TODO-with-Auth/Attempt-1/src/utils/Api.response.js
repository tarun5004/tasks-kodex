class ApiResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
    }
}

// The `ApiResponse` class is a simple data structure used to standardize the format of responses sent from an API. It includes three properties:

export default ApiResponse;