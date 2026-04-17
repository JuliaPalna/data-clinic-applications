import { useEffect, useState } from 'react';
import { type Ticket, getTickets } from '@/entities';

export const useTicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(tickets);

    const onSearchByPhone = ({ searchValue }: { searchValue: string }) => {
        if (tickets.length === 0) {
            return;
        }

        const existedTickets: Ticket[] = tickets.filter((ticket) => {
            return ticket.phone.includes(searchValue);
        });

        setFilteredTickets(existedTickets);
    };

    useEffect(() => {
        getTickets()
            .then(({ res, error }) => {
                if (error) {
                    setTickets([]);
                    setError(error);
                    return;
                }

                setTickets(res);
                setFilteredTickets(res);
                setError(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { filteredTickets, error, isLoading, onSearchByPhone };
};
