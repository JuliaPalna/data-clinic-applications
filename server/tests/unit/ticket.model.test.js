const mongoose = require('mongoose');
const Ticket = require('../../models/Ticket');

describe('Ticket Model', () => {
    describe('Schema Validation', () => {
        it('should create a valid ticket with required fields', async () => {
            const ticketData = {
                name: 'Test Ticket',
                phone: '+1234567890',
                description: 'Test description',
            };

            const ticket = new Ticket(ticketData);
            const savedTicket = await ticket.save();

            expect(savedTicket._id).toBeDefined();
            expect(savedTicket.name).toBe(ticketData.name);
            expect(savedTicket.phone).toBe(ticketData.phone);
            expect(savedTicket.description).toBe(ticketData.description);
            expect(savedTicket.date).toBeDefined();
        });

        it('should create a ticket without description (optional field)', async () => {
            const ticketData = {
                name: 'Test Ticket',
                phone: '+1234567890',
            };

            const ticket = new Ticket(ticketData);
            const savedTicket = await ticket.save();

            expect(savedTicket._id).toBeDefined();
            expect(savedTicket.name).toBe(ticketData.name);
            expect(savedTicket.phone).toBe(ticketData.phone);
            expect(savedTicket.description).toBeUndefined();
        });

        it('should fail to create ticket without name', async () => {
            const ticketData = {
                phone: '+1234567890',
            };

            const ticket = new Ticket(ticketData);
            
            await expect(ticket.save()).rejects.toThrow(mongoose.Error.ValidationError);
        });

        it('should fail to create ticket without phone', async () => {
            const ticketData = {
                name: 'Test Ticket',
            };

            const ticket = new Ticket(ticketData);
            
            await expect(ticket.save()).rejects.toThrow(mongoose.Error.ValidationError);
        });

        it('should trim whitespace from name and phone', async () => {
            const ticketData = {
                name: '  Test Ticket  ',
                phone: '  +1234567890  ',
            };

            const ticket = new Ticket(ticketData);
            const savedTicket = await ticket.save();

            expect(savedTicket.name).toBe('Test Ticket');
            expect(savedTicket.phone).toBe('+1234567890');
        });

        it('should set default date to now if not provided', async () => {
            const ticketData = {
                name: 'Test Ticket',
                phone: '+1234567890',
            };

            const beforeCreate = new Date();
            const ticket = new Ticket(ticketData);
            const savedTicket = await ticket.save();
            const afterCreate = new Date();

            expect(savedTicket.date.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
            expect(savedTicket.date.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
        });

        it('should accept empty string for description', async () => {
            const ticketData = {
                name: 'Test Ticket',
                phone: '+1234567890',
                description: '',
            };

            const ticket = new Ticket(ticketData);
            const savedTicket = await ticket.save();

            expect(savedTicket.description).toBe('');
        });
    });
});
