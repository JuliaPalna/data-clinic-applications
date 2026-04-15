export interface Ticket {
    id: string;
    date: string;
    name: string;
    phone: string;
    description?: string;
}

export interface TicketResponseApi {
    id: string;
    date: number;
    name: string;
    phone: string;
    description: string;
}
