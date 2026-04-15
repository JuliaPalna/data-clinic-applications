const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
