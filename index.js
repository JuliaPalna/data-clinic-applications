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
const { errorHandler, asyncHandler } = require('./server/middleware/errorHandler');

const app = express();

app.use(express.json()); // сервер автоматически парсит JSON-данные в теле запросов

// Парсит данные форм в формате URL-кодировки
// ({ extended: true } включает поддержку вложенных объектов)
app.use(express.urlencoded({ extended: true }));
// Парсит cookies, переданные клиентом в заголовках запросов
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, 'client/dist')));

app.post('/api/login', asyncHandler(async (req, res) => {
    const token = await login({
        email: req.body.email,
        password: req.body.password,
    });
    res.cookie('token', token, { httpOnly: true });
    res.json({
        success: true,
    });
}));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.post('/api/logout', asyncHandler(async (req, res) => {
    res.cookie('token', '', { httpOnly: true });
    res.status(200).json({ success: true });
}));

app.post('/api/tickets', asyncHandler(async (req, res) => {
    const newTicket = await addTicket(req.body);
    res.json(newTicket);
}));

app.use(auth);

app.get('/api/tickets', auth, asyncHandler(async (req, res) => {
    const tickets = await getTickets();
    await printListTickets(tickets);
    res.json(tickets);
}));

app.get('/tickets', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

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
    })
    .catch((error) => {
        console.error(chalk.red('Failed to connect to MongoDB:'), error.message);
        process.exit(1);
    });

// Глобальный обработчик ошибок должен быть последним middleware
app.use(errorHandler);
