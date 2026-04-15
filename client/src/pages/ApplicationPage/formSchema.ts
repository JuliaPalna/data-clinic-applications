import * as z from 'zod';

export const applicationSchema = z.object({
    userName: z
        .string()
        .trim()
        .min(5, 'ФИО должно содержать не менее 5 символов.')
        .max(32, 'ФИО должно содержать не более 32 символов.')
        .regex(/^[а-яА-ЯёЁ\s]+$/, 'Некорректные символы'),
    note: z
        .string()
        .trim()
        .max(100, 'Описание должно содержать не более 100 символов')
        .regex(/^[a-zA-Zа-яА-ЯёЁ0-9-'"?_:;.,№@\s]+$/, 'Некорректные символы')
        .optional(),
    phone: z
        .string()
        .trim()
        .regex(
            /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/,
            'Введите корректный номер телефона',
        ),
});

export type ApplicationSchema = z.input<typeof applicationSchema>;
