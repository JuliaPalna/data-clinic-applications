export interface Application {
    id: string;
    date: string;
    name: string;
    phone: string;
    note?: string;
}

export interface ApplicationResponseApi {
    id: string;
    date: number;
    name: string;
    phone: string;
    note: string;
}
