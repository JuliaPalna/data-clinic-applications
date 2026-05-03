const chalk = require('chalk');
const { ValidationError } = require('../utils/errors');

function errorHandler(err, req, res, next) {
    console.error(chalk.red('Error:'), err.message);
    console.error(chalk.red('Stack:'), err.stack);

    // Обработка ошибок валидации Joi
    if (err.name === 'ValidationError' && err.isJoi) {
        const messages = err.details.map(detail => detail.message).join(', ');
        return res.status(400).json({
            success: false,
            error: messages,
        });
    }

    // Обработка ошибок валидации Mongoose
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message).join(', ');
        return res.status(400).json({
            success: false,
            error: messages,
        });
    }

    // Обработка ошибок дублирования (unique constraint)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success: false,
            error: `Значение поля "${field}" уже существует`,
        });
    }

    // Обработка некорректного ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({
            success: false,
            error: 'Некорректный формат ID',
        });
    }

    const statusCode = err.statusCode || err.status || 500;

    const isProduction = process.env.NODE_ENV === 'production';
    
    let message = err.message || 'Внутренняя ошибка сервера';
    
    if (isProduction && statusCode === 500) {
        message = 'Внутренняя ошибка сервера';
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(isProduction ? {} : { stack: err.stack }),
    });
}

function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

module.exports = {
    errorHandler,
    asyncHandler,
};
