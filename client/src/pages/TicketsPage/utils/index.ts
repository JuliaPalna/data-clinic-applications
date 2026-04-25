import type { Ticket } from '@/entities';

export const sortTicketsByName = (array: Ticket[]): Ticket[] => {
    return [...array].sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
};

export const searchTicketsByPhone = ({
    array,
    searchValue,
}: {
    array: Ticket[];
    searchValue: string;
}): Ticket[] => {
    return array.filter((ticket) => {
        return ticket.phone.includes(searchValue);
    });
};
