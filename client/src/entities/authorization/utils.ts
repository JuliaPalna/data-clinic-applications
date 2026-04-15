import { authorizationApi } from './api';
import type { AuthorizationSchema } from './schema';
import type { AuthResponseApi } from './types';

export const authorization = async (authData: AuthorizationSchema) => {
    const response = await authorizationApi(authData);

    if (!response.ok) {
        throw new Error('Ошибка запроса. Повторите позже');
    }

    const user: AuthResponseApi = await response.json();

    if (!user) {
        throw new Error('Пользователь не найден. Проверьте email и пароль');
    }

    return user;
};
