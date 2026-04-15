import {
    Title,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components';
import { useTicketsPage } from './useTicketsPage';

export const TicketsPage = () => {
    const { tickets } = useTicketsPage();

    return (
        <>
            <Title>Список заявок</Title>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Дата</TableHead>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead>Проблема</TableHead>
                    </TableRow>
                </TableHeader>
                {tickets.length > 0 && (
                    <TableBody>
                        {tickets.map((ticket) => {
                            return (
                                <TableRow key={ticket.id}>
                                    <TableCell className="font-medium">
                                        {ticket.date}
                                    </TableCell>
                                    <TableCell>{ticket.name}</TableCell>
                                    <TableCell>{ticket.phone}</TableCell>
                                    <TableCell>{ticket.description}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                )}
            </Table>

            {tickets.length === 0 && (
                <p className="mt-10 text-xl text-muted-foreground text-center">
                    Заявок нет
                </p>
            )}
        </>
    );
};
