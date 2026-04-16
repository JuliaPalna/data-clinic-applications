import { Controller } from 'react-hook-form';
import {
    Alert,
    AlertDescription,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Center,
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    Input,
} from '@/components';
import { useAuthorizationPage } from './useAuthorizationPage';

export const LoginPage = () => {
    const { form, errorServer, onSubmit } = useAuthorizationPage();

    return (
        <Center>
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle>Вход</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        id="form-login"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-login-email">
                                            Электронная почта
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="email"
                                            id="form-login-email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Введите email"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-login-password">
                                            Пароль
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            id="form-login-password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Введите пароль"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={
                                        !form.formState.isValid ||
                                        form.formState.isSubmitting
                                    }
                                >
                                    {form.formState.isSubmitting
                                        ? 'Вход...'
                                        : 'Войти'}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter>
                    {errorServer && (
                        <Alert variant="destructive" className="max-w-md">
                            <AlertDescription>{errorServer}</AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </Center>
    );
};
