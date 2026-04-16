import { authorizationApi } from './api';
import type { AuthorizationSchema } from './schema';
import type { AuthResponse } from './types';

export const authorization = async (
    authData: AuthorizationSchema,
): Promise<AuthResponse> => {
    try {
        const response = await authorizationApi(authData);
        const data: AuthResponse = await response.json();

        if (!response.ok) {
            const message = data?.error || 'Ошибка: пользователь не найден';
            throw new Error(message);
        }

        return data;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(message);
    }
};
