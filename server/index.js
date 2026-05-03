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
} = require('./constants/index');
const authRouter = require('./routes/auth');
const ticketsRouter = require('./routes/tickets');
const auth = require('./middleware/auth');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, 'client/dist')));

app.use('/api', authRouter);
app.use('/api/tickets', ticketsRouter);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.get('/tickets', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

mongoose
    .connect(`mongodb://localhost:${MONGO_PORT}/${MONGO_DB}`)
    .then(async () => {
        console.log(chalk.green(`Connected to MongoDB on port ${MONGO_PORT}`));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
        });
    })
    .catch((error) => {
        console.error(chalk.red('Failed to connect to MongoDB:'), error.message);
        process.exit(1);
    });

app.use(errorHandler);
