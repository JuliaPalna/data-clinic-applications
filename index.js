const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { default: chalk } = require('chalk');
const {
    PORT,
    MONGO_DB,
    MONGO_PASSWORD,
    MONGO_PORT,
} = require('./server/constants/index');
const {
    getTickets,
    addTicket,
    printListTickets,
} = require('./server/controllers/ticket.controller');
const { login } = require('./server/controllers/user.controller');
const auth = require('./server/middleware/auth');

const app = express();

app.use(express.json()); // сервер автоматически парсит JSON-данные в теле запросов

// Парсит данные форм в формате URL-кодировки
// ({ extended: true } включает поддержку вложенных объектов)
app.use(express.urlencoded({ extended: true }));
// Парсит cookies, переданные клиентом в заголовках запросов
app.use(cookieParser());

app.post('/api/login', async (req, res) => {
    try {
        const token = await login({
            email: req.body.email,
            password: req.body.password,
        });
        res.cookie('token', token, { httpOnly: true });
        res.json({
            success: true,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
        });
    }
});

app.get('/login', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
    } catch (error) {
        res.status(404).json({
            success: false,
            error: 'Ошибка 404: Страница не найдена',
        });
    }
});

app.post('/api/logout', (req, res) => {
    try {
        res.cookie('token', '', { httpOnly: true });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка при выходе. Повторите позже',
        });
    }
});

app.post('/api/tickets', async (req, res) => {
    try {
        const newTicket = await addTicket(req.body);
        res.json(newTicket);
    } catch (error) {
        res.status(404).json({
            success: false,
            error: 'Страница не найдена',
        });
    }
});

app.use(auth);

app.get('/api/tickets', auth, async (req, res) => {
    try {
        const tickets = await getTickets();
        await printListTickets(tickets);
        res.json(tickets);
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Нет прав доступа',
        });
    }
});

app.get('/tickets', auth, (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Нет прав доступа',
        });
    }
});

app.use(express.static(path.resolve(__dirname, 'client/dist')));

mongoose
    .connect(
        `mongodb://user:${MONGO_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
    )
    .then(async () => {
        app.listen(PORT, () => {
            console.log(
                chalk.green(`Server is running on http://localhost:${PORT}`),
            );
        });
    });
