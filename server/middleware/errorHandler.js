const chalk = require('chalk');

// Глобальный обработчик ошибок для Express
function errorHandler(err, req, res, next) {
    // Логируем ошибку для разработчиков
    console.error(chalk.red('Error:'), err.message);
    console.error(chalk.red('Stack:'), err.stack);

    // Определяем статус ошибки
    const statusCode = err.statusCode || err.status || 500;

    // Не раскрываем детали реализации клиенту в production
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Безопасное сообщение об ошибке
    let message = err.message || 'Внутренняя ошибка сервера';
    
    // В production скрываем детали ошибок, кроме специально помеченных
    if (isProduction && statusCode === 500) {
        message = 'Внутренняя ошибка сервера';
    }

    // Формируем безопасный ответ
    res.status(statusCode).json({
        success: false,
        error: message,
        // В development можно добавить детали для отладки
        ...(isProduction ? {} : { stack: err.stack }),
    });
}

// Обработчик для асинхронных функций (wrapper)
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

module.exports = {
    errorHandler,
    asyncHandler,
};
