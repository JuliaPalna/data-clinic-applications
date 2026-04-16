import { useEffect, useState } from 'react';
import { type Ticket, getTickets } from '@/entities';

export const useTicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTickets().then(({ res, error }) => {
            if (error) {
                setTickets([]);
                setError(error);
                return;
            }

            setTickets(res);
            setError(null);
        });
    }, []);

    return { tickets, error };
};
