import type { TicketSchema } from './schema';

export const fetchTicketsApi = async (): Promise<Response> => {
    return await fetch(`/api/tickets`, {
        credentials: 'include',
    });
};

export const addTicketApi = async (data: TicketSchema): Promise<Response> => {
    return await fetch(`/api/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
