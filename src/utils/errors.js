export class AppError extends Error {
    constructor(message, type = 'GENERAL') {
        super(message);
        this.name = 'AppError';
        this.type = type;
    }
}


export class ValidationError extends AppError {
    constructor(message) {
        super(message, 'VALIDATION');
        this.name = 'ValidationError';
    }
}


export class NotFoundError extends AppError {
    constructor(message) {
        super(message, 'NOT_FOUND');
        this.name = 'NotFoundError';
    }
}


export class NetworkError extends AppError {
    constructor(message) {
        super(message, 'NETWORK');
        this.name = 'NetworkError';
    }
}