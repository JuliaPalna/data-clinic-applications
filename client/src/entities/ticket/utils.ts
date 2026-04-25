import { formatLocalDate } from '@/lib/formatLocalDate';
import { fetchTicketsApi } from './api';
import type { Ticket, TicketResponseApi } from './types';

export const getTickets = async (): Promise<{
    error: string | null;
    res: Ticket[];
}> => {
    try {
        const response = await fetchTicketsApi();

        if (response.status === 401) {
            return {
                error: '401: Нет прав доступа',
                res: [],
            };
        }

        if (!response.ok) {
            return {
                error: 'Ошибка. повторите позже',
                res: [],
            };
        }

        const data: TicketResponseApi[] = await response.json();

        if (!data) {
            return {
                error: 'Заявок нет',
                res: [],
            };
        }

        const ticketsLoaded: Ticket[] = data.map((ticket) => {
            return {
                ...ticket,
                id: ticket._id,
                date: formatLocalDate(ticket.date),
            };
        });

        return { error: null, res: ticketsLoaded };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Ошибка загрузки',
            res: [],
        };
    }
};
