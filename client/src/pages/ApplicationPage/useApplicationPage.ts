import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaApplication, type SchemaApplication } from './formSchema';
import { addApplicationsApi } from '@/entities';

export const useApplicationPage = () => {
    const [submissionStatus, setSubmissionStatus] = useState<{
        error: null | string;
        submitted: boolean;
    }>({
        error: null,
        submitted: false,
    });

    const form = useForm<SchemaApplication>({
        resolver: zodResolver(schemaApplication),
        mode: 'onBlur',
        defaultValues: {
            userName: '',
            phone: '',
        },
    });

    async function onSubmit(data: SchemaApplication): Promise<void> {
        try {
            const response = await addApplicationsApi(data);

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
