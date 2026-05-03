const {
    AppError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    validateRequest,
    isValidObjectId,
} = require('../../utils/errors');
const Joi = require('joi');

describe('Error Classes', () => {
    describe('AppError', () => {
        it('should create an AppError with correct properties', () => {
            const error = new AppError('Test error', 400);

            expect(error.message).toBe('Test error');
            expect(error.statusCode).toBe(400);
            expect(error.status).toBe('fail');
            expect(error.isOperational).toBe(true);
            expect(error instanceof Error).toBe(true);
        });

        it('should set status to "error" for 5xx status codes', () => {
            const error = new AppError('Server error', 500);
            expect(error.status).toBe('error');
        });
    });

    describe('ValidationError', () => {
        it('should create a ValidationError with default message', () => {
            const error = new ValidationError();

            expect(error.message).toBe('Ошибка валидации');
            expect(error.statusCode).toBe(400);
            expect(error.status).toBe('fail');
        });

        it('should create a ValidationError with custom message', () => {
            const error = new ValidationError('Custom validation error');

            expect(error.message).toBe('Custom validation error');
            expect(error.statusCode).toBe(400);
        });
    });

    describe('UnauthorizedError', () => {
        it('should create an UnauthorizedError with default message', () => {
            const error = new UnauthorizedError();

            expect(error.message).toBe('Необходима авторизация');
            expect(error.statusCode).toBe(401);
        });

        it('should create an UnauthorizedError with custom message', () => {
            const error = new UnauthorizedError('Token expired');

            expect(error.message).toBe('Token expired');
            expect(error.statusCode).toBe(401);
        });
    });

    describe('ForbiddenError', () => {
        it('should create a ForbiddenError with default message', () => {
            const error = new ForbiddenError();

            expect(error.message).toBe('Доступ запрещён');
            expect(error.statusCode).toBe(403);
        });
    });

    describe('NotFoundError', () => {
        it('should create a NotFoundError with default message', () => {
            const error = new NotFoundError();

            expect(error.message).toBe('Ресурс не найден');
            expect(error.statusCode).toBe(404);
        });

        it('should create a NotFoundError with custom message', () => {
            const error = new NotFoundError('User not found');

            expect(error.message).toBe('User not found');
            expect(error.statusCode).toBe(404);
        });
    });

    describe('ConflictError', () => {
        it('should create a ConflictError with default message', () => {
            const error = new ConflictError();

            expect(error.message).toBe('Конфликт ресурсов');
            expect(error.statusCode).toBe(409);
        });
    });
});

describe('validateRequest middleware', () => {
    it('should call next() when validation passes', () => {
        const schema = Joi.object({
            name: Joi.string().required(),
        });

        const req = {
            body: { name: 'Test' },
        };
        const res = {};
        const next = jest.fn();

        const middleware = validateRequest(schema);
        middleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
    });

    it('should call next() with ValidationError when validation fails', () => {
        const schema = Joi.object({
            name: Joi.string().required(),
        });

        const req = {
            body: {},
        };
        const res = {};
        const next = jest.fn();

        const middleware = validateRequest(schema);
        middleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        const error = next.mock.calls[0][0];
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toContain('name');
    });

    it('should handle multiple validation errors', () => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
        });

        const req = {
            body: { email: 'invalid', password: 'abc' },
        };
        const res = {};
        const next = jest.fn();

        const middleware = validateRequest(schema);
        middleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        const error = next.mock.calls[0][0];
        expect(error).toBeInstanceOf(ValidationError);
    });
});

describe('isValidObjectId', () => {
    it('should return true for valid ObjectId', () => {
        const validId = '507f1f77bcf86cd799439011';
        expect(isValidObjectId(validId)).toBe(true);
    });

    it('should return false for invalid ObjectId', () => {
        const invalidId = 'invalid-id';
        expect(isValidObjectId(invalidId)).toBe(false);
    });

    it('should return false for empty string', () => {
        expect(isValidObjectId('')).toBe(false);
    });

    it('should return false for null', () => {
        expect(isValidObjectId(null)).toBe(false);
    });

    it('should return false for undefined', () => {
        expect(isValidObjectId(undefined)).toBe(false);
    });
});
