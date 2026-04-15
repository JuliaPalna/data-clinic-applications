import { useEffect, useState } from 'react';
import { formatLocalDate } from '@/lib/formatLocalDate';
import {
    fetchApplicationsApi,
    type Application,
    type ApplicationResponseApi,
} from '@/entities';

export const useApplicationsPage = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        fetchApplicationsApi()
            .then((res) => {
                if (!res || !res.ok) {
                    setApplications([]);
                }

                return res.json();
            })
            .then((data: ApplicationResponseApi[]) => {
                if (data) {
                    const applicationsLoaded: Application[] = data.map(
                        (application) => {
                            return {
                                ...application,
                                date: formatLocalDate(application.date),
                            };
                        },
                    );

                    setApplications(applicationsLoaded);
                }
            })
            .catch((error) => {
                const messageError =
                    error instanceof Error ? error.message : 'Ошибка загрузки';
                console.error(messageError);
            });
    }, []);

    return { applications };
};
