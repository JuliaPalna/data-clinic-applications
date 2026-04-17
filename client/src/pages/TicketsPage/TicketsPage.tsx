import {
    Title,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Alert,
    AlertDescription,
    Center,
} from '@/components';
import { useTicketsPage } from './useTicketsPage';

export const TicketsPage: React.FC = () => {
    const { tickets, error, isLoading } = useTicketsPage();

    if (isLoading) {
        return (
            <Center>
                <Alert variant="default">
                    <AlertDescription>Загрузка...</AlertDescription>
                </Alert>
            </Center>
        );
    }

    if (error?.includes('401')) {
        return (
            <Center>
                <Alert variant="destructive">
                    <AlertDescription>Нет прав доступа</AlertDescription>
                </Alert>
            </Center>
        );
    }

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

            {error && (
                <div className="mt-10 ">
                    <Alert className="max-w-md">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </div>
            )}
        </>
    );
};
