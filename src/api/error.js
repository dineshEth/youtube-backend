class ApiError {
    constructor(statusCode, message ="Something went wrong"){
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode < 200;
    }
}

export { ApiError }