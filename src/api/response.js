class ApiResponse {
    constructor(statusCode=200, message="OK", data=[]){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode > 300;
    }
}

export { ApiResponse }