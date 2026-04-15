import { useEffect, useState } from 'react';
import { formatLocalDate } from '@/lib/formatLocalDate';
import {
    fetchApplicationsApi,
    type User,
    type UserResponseApi,
} from '@/entities';

export const useApplicationsPage = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchApplicationsApi()
            .then((res) => {
                if (!res || !res.ok) {
                    setUsers([]);
                }

                return res.json();
            })
            .then((data: UserResponseApi[]) => {
                if (data) {
                    const usersLoaded: User[] = data.map((user) => {
                        return { ...user, date: formatLocalDate(user.date) };
                    });

                    setUsers(usersLoaded);
                }
            })
            .catch((error) => {
                const messageError =
                    error instanceof Error ? error.message : 'Ошибка загрузки';
                console.error(messageError);
            });
    }, []);

    return { users };
};
