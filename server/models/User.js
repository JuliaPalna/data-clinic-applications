const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Неверный формат email',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Пароль должен содержать минимум 4 символа'],
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
