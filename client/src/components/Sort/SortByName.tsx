import { Checkbox, Field, Label } from '../ui';

interface SortByNameProps {
    isSort: boolean;
    onSort: (value: boolean) => void;
}
export const SortByName: React.FC<SortByNameProps> = ({ isSort, onSort }) => {
    return (
        <Field orientation="horizontal">
            <Checkbox
                id="sort-checkbox"
                name="sort-checkbox"
                checked={isSort}
                onCheckedChange={onSort}
            />
            <Label htmlFor="sort-checkbox">Сортировать по ФИО</Label>
        </Field>
    );
};
