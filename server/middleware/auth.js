const jwt = require('jsonwebtoken');
const { default: chalk } = require('chalk');
const { JWT_SECRET } = require('../constants/index.js');

function auth(req, res, next) {
    const token = req.cookies.token;

    try {
        const verifyResult = jwt.verify(token, JWT_SECRET);

        req.user = {
            email: verifyResult.email,
        };

        next();
    } catch (error) {
        if (req.path.startsWith('/api')) {
            res.status(401).json({
                success: false,
                error: 'Пользователь не авторизован',
            });
        }

        return res.redirect('/');
    }
}

module.exports = auth;
