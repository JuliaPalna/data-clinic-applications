const { default: chalk } = require('chalk');
const Ticket = require('../models/Ticket.js');

async function addTicket(data) {
    const ticket = await Ticket.create({ ...data, date: new Date() });
    console.log(chalk.bgGreen('Ticket add'));
    return ticket;
}

async function getTickets() {
    return await Ticket.find().sort({ date: -1 });
}

async function printListTickets() {
    const tickets = await getTickets();
    console.log(chalk.bgBlue('Here is the list of tickets:'));
    tickets.forEach((ticket) => {
        console.log(chalk.blue(ticket.id, ticket.title));
    });
}

module.exports = {
    getTickets,
    addTicket,
    printListTickets,
};
