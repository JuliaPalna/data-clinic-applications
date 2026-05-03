const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getTickets,
    addTicket,
    printListTickets,
} = require('../controllers/ticket.controller');
const { asyncHandler } = require('../middleware/errorHandler');
const { validateRequest } = require('../utils/errors');
const { ticketCreateSchema } = require('../utils/validation');

router.post('/', 
    validateRequest(ticketCreateSchema),
    asyncHandler(async (req, res) => {
        const newTicket = await addTicket(req.body);
        res.status(201).json(newTicket);
    })
);

router.get('/', auth, asyncHandler(async (req, res) => {
    const tickets = await getTickets();
    printListTickets().catch(err => console.error('Error printing tickets:', err));
    res.json(tickets);
}));

module.exports = router;
