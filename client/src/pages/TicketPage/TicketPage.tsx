import { Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { IMaskInput } from 'react-imask';
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
    Textarea,
} from '@/components';
import { useTicketPage } from './useTicketPage';

export const TicketPage: React.FC = () => {
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
                                        <IMaskInput
                                            id="form-ticket-phone"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="+7-000-000-00-00"
                                            autoComplete="tel"
                                            value={field.value || ''}
                                            type="tel"
                                            mask="+7-000-000-00-00"
                                            lazy={false}
                                            placeholderChar="_"
                                            inputMode="tel"
                                            data-slot="input"
                                            onAccept={(value) =>
                                                field.onChange(value)
                                            }
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            className={cn(`h-8 w-full min-w-0 rounded-lg border border-input bg-transparent
                                                        px-2.5 py-1 text-base transition-colors
                                                        outline-none placeholder:text-muted-foreground
                                                        focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50
                                                        disabled:pointer-events-none disabled:cursor-not-allowed
                                                        disabled:bg-input/50 disabled:opacity-50
                                                        aria-invalid:border-destructive aria-invalid:ring-3
                                                        aria-invalid:ring-destructive/20 md:text-sm`)}
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
                        <Alert variant="destructive" className="max-w-md">
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
