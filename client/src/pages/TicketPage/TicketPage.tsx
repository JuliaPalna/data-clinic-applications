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
    InputMaskPhone,
    Textarea,
} from '@/components';
import { useTicketPage } from './useTicketPage';

export const TicketPage = () => {
    const { form, submissionStatus, onSubmit } = useTicketPage();

    return (
        <Center>
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle>Форма заявки</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        id="form-rhf-demo"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-ticket-user-name">
                                            ФИО
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-ticket-user-name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Введите полное ФИО"
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
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-ticket-phone">
                                            Телефон
                                        </FieldLabel>
                                        <InputMaskPhone
                                            field={field}
                                            id="form-ticket-phone"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="+7-000-000-00-00"
                                            autoComplete="tel"
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
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-ticket-description">
                                            Опишите вашу проблему
                                        </FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="form-ticket-description"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Введите описание"
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

                            <Field orientation="horizontal">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={
                                        !form.formState.isValid ||
                                        form.formState.isLoading
                                    }
                                >
                                    Отправить
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter>
                    {submissionStatus.error && (
                        <Alert
                            variant="destructive"
                            className="max-w-md"
                            // border-amber-200 bg-amber-50 text-amber-900
                        >
                            <AlertDescription>
                                {submissionStatus.error}
                            </AlertDescription>
                        </Alert>
                    )}

                    {submissionStatus.submitted && (
                        <Alert variant="success" className="max-w-md">
                            <AlertDescription>
                                Форма успешно отправлена
                            </AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </Center>
    );
};
