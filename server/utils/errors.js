const mongoose = require('mongoose');

/**
 * Базовый класс для кастомных ошибок приложения
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Ошибка валидации (400)
 */
class ValidationError extends AppError {
    constructor(message = 'Ошибка валидации') {
        super(message, 400);
    }
}

/**
 * Ошибка авторизации (401)
 */
class UnauthorizedError extends AppError {
    constructor(message = 'Необходима авторизация') {
        super(message, 401);
    }
}

/**
 * Ошибка доступа (403)
 */
class ForbiddenError extends AppError {
    constructor(message = 'Доступ запрещён') {
        super(message, 403);
    }
}

/**
 * Ошибка "не найдено" (404)
 */
class NotFoundError extends AppError {
    constructor(message = 'Ресурс не найден') {
        super(message, 404);
    }
}

/**
 * Ошибка конфликта (409)
 */
class ConflictError extends AppError {
    constructor(message = 'Конфликт ресурсов') {
        super(message, 409);
    }
}

/**
 * Валидатор для схем Mongoose
 * @param {Object} schema - схема Mongoose
 * @returns {Function} middleware для валидации
 */
function validateRequest(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const messages = error.details.map(detail => detail.message).join(', ');
            return next(new ValidationError(messages));
        }
        
        next();
    };
}

/**
 * Утилита для проверки ObjectId
 * @param {string} id - строка ID
 * @returns {boolean}
 */
function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
    AppError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    validateRequest,
    isValidObjectId,
};
