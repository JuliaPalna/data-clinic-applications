const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, SALT_ROUNDS } = require('../constants/index.js');

async function addUser(email, password) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ email, password: passwordHash });
    console.log(chalk.bgGreen('User was add'));
}

async function login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Пользователь с данным email не найден');
    }

    const isCorrectedPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectedPassword) {
        throw new Error('Неверный пароль');
    }

    return jwt.sign({ email }, JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = {
    login,
    addUser,
};
