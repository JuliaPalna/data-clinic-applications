import { useEffect, useState } from 'react';
import { searchTicketsByPhone, sortTicketsByName } from './utils';
import { type Ticket, getTickets } from '@/entities';

export const useTicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(tickets);
    const [isSortByName, setIsSortByName] = useState<boolean>(false);
    const [searchValueByPhone, setSearchValueByPhone] = useState<string>('');

    const onFilteredTickets = ({
        isSort,
        searchValue,
    }: {
        isSort: boolean;
        searchValue: string;
    }) => {
        let newTickets = [...tickets];

        if (isSort) {
            newTickets = sortTicketsByName(newTickets);
        }

        if (searchValue) {
            newTickets = searchTicketsByPhone({
                array: newTickets,
                searchValue,
            });
        }

        setFilteredTickets(newTickets);
    };

    const onSort = (value: boolean) => {
        setIsSortByName(value);
        onFilteredTickets({
            isSort: value,
            searchValue: searchValueByPhone,
        });
    };

    const onSearch = (value: string) => {
        setSearchValueByPhone(value);
        onFilteredTickets({ searchValue: value, isSort: isSortByName });
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

    return {
        filteredTickets,
        error,
        isLoading,
        isSort: isSortByName,
        searchValue: searchValueByPhone,
        onSort,
        onSearch,
    };
};
