const Joi = require('joi');

/**
 * Схема валидации для регистрации/создания пользователя
 */
const userRegisterSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email не может быть пустым',
            'string.email': 'Неверный формат email',
            'any.required': 'Email обязателен',
        }),
    password: Joi.string()
        .min(4)
        .required()
        .messages({
            'string.empty': 'Пароль не может быть пустым',
            'string.min': 'Пароль должен содержать минимум 4 символа',
            'any.required': 'Пароль обязателен',
        }),
});

/**
 * Схема валидации для логина
 */
const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email не может быть пустым',
            'string.email': 'Неверный формат email',
            'any.required': 'Email обязателен',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Пароль не может быть пустым',
            'any.required': 'Пароль обязателен',
        }),
});

/**
 * Схема валидации для создания тикета
 */
const ticketCreateSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Имя не может быть пустым',
            'string.min': 'Имя должно содержать минимум 2 символа',
            'string.max': 'Имя не должно превышать 100 символов',
            'any.required': 'Имя обязательно',
        }),
    phone: Joi.string()
        .pattern(/^[0-9+\-\s()]+$/)
        .min(5)
        .required()
        .messages({
            'string.empty': 'Телефон не может быть пустым',
            'string.pattern.base': 'Неверный формат телефона',
            'string.min': 'Телефон слишком короткий',
            'any.required': 'Телефон обязателен',
        }),
    description: Joi.string()
        .max(500)
        .allow('', null)
        .messages({
            'string.max': 'Описание не должно превышать 500 символов',
        }),
});

module.exports = {
    userRegisterSchema,
    loginSchema,
    ticketCreateSchema,
};
