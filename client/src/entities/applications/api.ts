import { BASE_URL } from '@/constants/index';
import type { ApplicationSchema } from '@/pages/ApplicationPage/formSchema';

export const fetchApplicationsApi = async (): Promise<Response> => {
    return await fetch(`${BASE_URL}/applications`);
};

export const addApplicationsApi = async (
    data: ApplicationSchema,
): Promise<Response> => {
    return await fetch(`${BASE_URL}/applications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
