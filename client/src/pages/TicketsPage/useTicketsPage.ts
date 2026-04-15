import { useEffect, useState } from 'react';
import { formatLocalDate } from '@/lib/formatLocalDate';
import {
    fetchTicketsApi,
    type Ticket,
    type TicketResponseApi,
} from '@/entities';

export const useTicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        fetchTicketsApi()
            .then((res) => {
                if (!res || !res.ok) {
                    setTickets([]);
                }

                return res.json();
            })
            .then((data: TicketResponseApi[]) => {
                if (data) {
                    const ticketsLoaded: Ticket[] = data.map((ticket) => {
                        return {
                            ...ticket,
                            date: formatLocalDate(ticket.date),
                        };
                    });

                    setTickets(ticketsLoaded);
                }
            })
            .catch((error) => {
                const messageError =
                    error instanceof Error ? error.message : 'Ошибка загрузки';
                console.error(messageError);
            });
    }, []);

    return { tickets };
};
