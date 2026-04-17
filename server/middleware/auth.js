const jwt = require('jsonwebtoken');
const { default: chalk } = require('chalk');
const { JWT_SECRET } = require('../constants/index.js');

function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ error: 'Пользователь не авторизован' });
        console.log(chalk.bgRed('No token provided'));
        return;
    }

    try {
        const verifyResult = jwt.verify(token, JWT_SECRET);

        req.user = {
            email: verifyResult.email,
        };

        next();
    } catch (error) {
        res.status(404).json({
            success: false,
            error: 'Ошибка 404: Страница не найдена',
        });
    }
}

module.exports = auth;
