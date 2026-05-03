const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
