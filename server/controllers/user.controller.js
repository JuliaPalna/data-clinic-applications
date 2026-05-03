const bcrypt = require('bcrypt');
const { default: chalk } = require('chalk');
const User = require('../models/User');
const { SALT_ROUNDS } = require('../constants/index.js');

async function addUser(email, password) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ email, password: passwordHash });
    console.log(chalk.bgGreen('User was add'));
}

module.exports = {
    addUser,
};
