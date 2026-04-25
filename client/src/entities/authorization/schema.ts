import * as z from 'zod';

export const authorizationSchema = z.object({
    email: z
        .email()
        .trim()
        .min(3, 'Email должен содержать не менее 3 символов')
        .max(10, 'Email должен содержать не более 10 символов'),
    password: z
        .string()
        .trim()
        .min(4, 'Email должен содержать не менее 4 символов'),
});

export type AuthorizationSchema = z.input<typeof authorizationSchema>;
