import type { TicketSchema } from './schema';

export const fetchTicketsApi = async () => {
    return await fetch(`/api/tickets`);
};

export const addTicketsApi = (data: TicketSchema) => {
    fetch(`/api/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
