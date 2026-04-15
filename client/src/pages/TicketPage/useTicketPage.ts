import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTicketsApi, ticketSchema, type TicketSchema } from '@/entities';

export const useTicketPage = () => {
    const [submissionStatus, setSubmissionStatus] = useState<{
        error: null | string;
        submitted: boolean;
    }>({
        error: null,
        submitted: false,
    });

    const form = useForm<TicketSchema>({
        resolver: zodResolver(ticketSchema),
        mode: 'onBlur',
        defaultValues: {
            name: '',
            phone: '',
        },
    });

    async function onSubmit(data: TicketSchema): Promise<void> {
        try {
            const response = await addTicketsApi(data);

            if (!response.ok) {
                setSubmissionStatus({
                    error: 'Ошибка отправки. Повторите запрос',
                    submitted: false,
                });
                return;
            }

            setSubmissionStatus({
                error: null,
                submitted: true,
            });

            form.reset();
        } catch {
            setSubmissionStatus({
                error: 'Ошибка отправки. Повторите запрос',
                submitted: false,
            });
        }
    }

    return { form, onSubmit, submissionStatus };
};
