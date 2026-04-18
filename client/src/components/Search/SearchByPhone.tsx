import { IMaskInput } from 'react-imask';
import { Field, FieldLabel } from '../ui';
import { cn } from '@/lib/utils';
import type { SearchByPhoneProps } from './type';

export const SearchByPhone: React.FC<SearchByPhoneProps> = ({
    searchValue,
    onSearch,
}) => {
    return (
        <div>
            <Field>
                <FieldLabel htmlFor="search-ticket-phone">
                    Поиск по номеру телефона
                </FieldLabel>

                <IMaskInput
                    id="search-ticket-phone"
                    placeholder="Введите номер"
                    value={searchValue}
                    type="tel"
                    mask="+7-000-000-00-00"
                    lazy={true}
                    onAccept={(value) => onSearch(value)}
                    autoComplete="off"
                    className={cn(`h-8 w-full min-w-0 rounded-lg border border-input bg-transparent
                    px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground
                    focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`)}
                />
            </Field>
        </div>
    );
};
