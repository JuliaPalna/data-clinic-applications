const { errorHandler, asyncHandler } = require('../../middleware/errorHandler');
const { ValidationError, NotFoundError } = require('../../utils/errors');

describe('errorHandler middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
        
        // Reset process.env for each test
        delete process.env.NODE_ENV;
    });

    it('should handle Joi validation errors', () => {
        const error = {
            name: 'ValidationError',
            isJoi: true,
            details: [
                { message: 'Email is required' },
                { message: 'Password must be at least 4 characters' },
            ],
        };

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Email is required, Password must be at least 4 characters',
        });
    });

    it('should handle Mongoose validation errors', () => {
        const error = {
            name: 'ValidationError',
            isJoi: false,
            errors: {
                email: { message: 'Invalid email format' },
                password: { message: 'Password too short' },
            },
        };

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Invalid email format, Password too short',
        });
    });

    it('should handle duplicate key errors (code 11000)', () => {
        const error = {
            code: 11000,
            keyValue: { email: 'test@example.com' },
        };

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Значение поля "email" уже существует',
        });
    });

    it('should handle CastError for invalid ObjectId', () => {
        const error = {
            name: 'CastError',
            kind: 'ObjectId',
        };

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Некорректный формат ID',
        });
    });

    it('should handle custom AppError with statusCode', () => {
        const error = new NotFoundError('User not found');

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'User not found',
        });
    });

    it('should return 500 for unknown errors', () => {
        const error = new Error('Unknown error');

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
                error: 'Unknown error',
            })
        );
    });

    it('should hide error details in production for 500 errors', () => {
        process.env.NODE_ENV = 'production';
        const error = new Error('Sensitive error message');

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Внутренняя ошибка сервера',
        });
    });

    it('should include stack trace in development mode', () => {
        process.env.NODE_ENV = 'development';
        const error = new Error('Test error');
        error.stack = 'Error: Test error\n    at test.js:1:1';

        errorHandler(error, req, res, next);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                stack: 'Error: Test error\n    at test.js:1:1',
            })
        );
    });

    it('should exclude stack trace in production mode', () => {
        process.env.NODE_ENV = 'production';
        const error = new Error('Test error');

        errorHandler(error, req, res, next);

        const response = res.json.mock.calls[0][0];
        expect(response.stack).toBeUndefined();
    });
});

describe('asyncHandler', () => {
    it('should call the handler function', async () => {
        const handler = jest.fn((req, res, next) => Promise.resolve());
        const req = {};
        const res = {};
        const next = jest.fn();

        const wrappedHandler = asyncHandler(handler);
        await wrappedHandler(req, res, next);

        expect(handler).toHaveBeenCalledWith(req, res, next);
    });

    it('should pass errors to next()', async () => {
        const error = new Error('Test error');
        const handler = jest.fn(() => Promise.reject(error));
        const req = {};
        const res = {};
        const next = jest.fn();

        const wrappedHandler = asyncHandler(handler);
        await wrappedHandler(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('should handle synchronous errors', async () => {
        const error = new Error('Sync error');
        const handler = () => {
            throw error;
        };
        const req = {};
        const res = {};
        const next = jest.fn();

        const wrappedHandler = asyncHandler(handler);
        await wrappedHandler(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
