import { BASE_URL } from '@/constants/index';
import type { TicketSchema } from './schema';

export const fetchTicketsApi = async (): Promise<Response> => {
    return await fetch(`${BASE_URL}/tickets`);
};

export const addTicketsApi = async (data: TicketSchema): Promise<Response> => {
    return await fetch(`${BASE_URL}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
