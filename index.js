const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { default: chalk } = require('chalk');

const {
    getTickets,
    addTicket,
    printListTickets,
} = require('./server/models/controllers/ticket.controller');

const PORT = 3004;

const app = express();

app.use(express.json()); // сервер автоматически парсит JSON-данные в теле запросов
app.use(express.static('dist')); // Готовая сборка React

// Парсит данные форм в формате URL-кодировки
// ({ extended: true } включает поддержку вложенных объектов)
app.use(express.urlencoded({ extended: true }));
// Парсит cookies, переданные клиентом в заголовках запросов
app.use(cookieParser());
// Включает раздачу статических файлов (CSS, JS, изображения) из папки "public"
app.use(express.static(path.resolve(__dirname, 'client/public')));
app.use(express.static(path.resolve(__dirname, 'client/dist')));

app.get('/tickets', async (req, res) => {
    const tickets = await getTickets();
    await printListTickets(tickets);
    res.json(tickets);
});

// // Все остальные маршруты отдаём React (SPA)
// app.get('/:any', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
// });

mongoose
    .connect('mongodb://user:mongopass@localhost:27017/clinic?authSource=admin')
    .then(async () => {
        app.listen(PORT, () => {
            console.log(
                chalk.green(`Server is running on http://localhost:${PORT}`),
            );
        });
    });
