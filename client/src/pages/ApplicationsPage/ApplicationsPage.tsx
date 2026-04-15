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
    const { applications } = useApplicationsPage();

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
                {applications.length > 0 && (
                    <TableBody>
                        {applications.map((application) => {
                            return (
                                <TableRow key={application.id}>
                                    <TableCell className="font-medium">
                                        {application.date}
                                    </TableCell>
                                    <TableCell>{application.name}</TableCell>
                                    <TableCell>{application.phone}</TableCell>
                                    <TableCell>{application.note}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                )}
            </Table>

            {applications.length === 0 && (
                <p className="mt-10 text-xl text-muted-foreground text-center">
                    Заявок нет
                </p>
            )}
        </>
    );
};
