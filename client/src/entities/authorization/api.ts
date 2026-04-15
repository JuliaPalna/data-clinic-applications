import { BASE_URL } from '@/constants';
import type { AuthorizationSchema } from './schema';

export const authorizationApi = (
    data: AuthorizationSchema,
): Promise<Response> => {
    return fetch(`${BASE_URL}/users?email=${data}`);
};
