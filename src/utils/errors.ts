import { HttpStatusCode } from '@utils/enums';

export class ApiError extends Error {
    public statusCode: HttpStatusCode;

    constructor(statusCode: HttpStatusCode, message: string) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}
