import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    authorization,
    authorizationSchema,
    type AuthorizationSchema,
} from '../../entities';

export const useAuthorizationPage = () => {
    const [errorServer, setErrorServer] = useState<null | string>(null);

    const form = useForm<AuthorizationSchema>({
        resolver: zodResolver(authorizationSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: AuthorizationSchema): Promise<void> {
        try {
            const response = await authorization(data);

            if (!response) {
                setErrorServer('Ошибка. Повторите запрос');
                return;
            }

            setErrorServer(null);
            form.reset();
        } catch {
            setErrorServer('Ошибка. Повторите запрос');
        }
    }

    return { form, onSubmit, errorServer };
};
