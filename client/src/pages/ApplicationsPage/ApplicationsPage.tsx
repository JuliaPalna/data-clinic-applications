import {
    Title,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components';
import { useApplicationsPage } from './useApplicationsPage';

export const ApplicationsPage = () => {
    const { users } = useApplicationsPage();

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
                {users.length > 0 && (
                    <TableBody>
                        {users.map((user) => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {user.date}
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.note}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                )}
            </Table>

            {users.length === 0 && (
                <p className="mt-10 text-xl text-muted-foreground text-center">
                    Заявок нет
                </p>
            )}
        </>
    );
};
