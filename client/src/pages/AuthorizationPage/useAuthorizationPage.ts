import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    authorization,
    authorizationSchema,
    type AuthorizationSchema,
} from '../../entities';

export const useAuthorizationPage = () => {
    const navigate = useNavigate();
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
            setErrorServer(null);
            await authorization(data);
            form.reset();
            navigate('/tickets');
        } catch (error) {
            const message =
                error instanceof Error ? error.message : String(error);
            setErrorServer(message);
        }
    }

    return { form, onSubmit, errorServer };
};
