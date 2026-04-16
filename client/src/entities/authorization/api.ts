import type { AuthorizationSchema } from './schema';

export const authorizationApi = (
    data: AuthorizationSchema,
): Promise<Response> => {
    return fetch(`/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
