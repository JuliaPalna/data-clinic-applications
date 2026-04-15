const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { default: chalk } = require('chalk');

const User = require('./server/models/User');
const Ticket = require('./server/models/Ticket');

const { mainModule } = require('process');
const PORT = 3004;

const app = express();

// сервер автоматически парсит JSON-данные в теле запросов
app.use(express.json());
// Парсит данные форм в формате URL-кодировки
// ({ extended: true } включает поддержку вложенных объектов)
app.use(express.urlencoded({ extended: true }));
// Парсит cookies, переданные клиентом в заголовках запросов
app.use(cookieParser());
// Включает раздачу статических файлов (CSS, JS, изображения) из папки "public"
app.use(express.static(path.resolve(__dirname, 'public')));

mongoose
    .connect('mongodb://user:mongopass@localhost:27017/clinic?authSource=admin')
    .then(async () => {
        await Ticket.create({
            date: Date.now().toString(),
            name: 'name name',
            phone: '+7-910-000-00-00',
        });
        app.listen(PORT, () => {
            console.log(
                chalk.green(`Server is running on http://localhost:${PORT}`),
            );
        });
    });
