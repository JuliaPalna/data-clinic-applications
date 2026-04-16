const { default: chalk } = require('chalk');
const Ticket = require('../../models/Ticket.js');

async function addTicket(data) {
    await Ticket.create({ ...data, date: Date.now() });
    console.log(chalk.bgGreen('Ticket add'));
}

async function getTickets() {
    return await Ticket.find();
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
