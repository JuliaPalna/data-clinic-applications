const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { validateRequest } = require('../utils/errors');
const { loginSchema } = require('../utils/validation');

router.post('/login', 
    validateRequest(loginSchema),
    asyncHandler(async (req, res) => {
        const token = await login({
            email: req.body.email,
            password: req.body.password,
        });
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.json({
            success: true,
        });
    })
);

router.post('/logout', auth, asyncHandler(async (req, res) => {
    await logout();
    res.clearCookie('token');
    res.status(200).json({ success: true });
}));

module.exports = router;
