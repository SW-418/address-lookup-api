interface IApiError {
    error: string
}

export class ApiError implements IApiError {
    error: string;


    constructor(errorMessage: string) {
        this.error = errorMessage;
    }
}
