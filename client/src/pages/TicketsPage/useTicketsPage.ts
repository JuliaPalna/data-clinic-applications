import { useEffect, useState } from 'react';
import { type Ticket, getTickets } from '@/entities';

export const useTicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getTickets()
            .then(({ res, error }) => {
                if (error) {
                    setTickets([]);
                    setError(error);
                    return;
                }

                setTickets(res);
                setError(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { tickets, error, isLoading };
};
