export interface Ticket {
    id: string;
    date: string;
    name: string;
    phone: string;
    description?: string;
}

export interface TicketResponseApi {
    _id: string;
    date: number;
    name: string;
    phone: string;
    description: string;
}
