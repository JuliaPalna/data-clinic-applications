import { useState } from 'react';
import { debounce } from '@/lib/debounce';
import type { SearchByPhoneProps } from './type';

export const useSearchByPhone = ({ onSearch }: SearchByPhoneProps) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const onChangeSearchValue = debounce((value: string) => {
        setSearchValue(value);
        onSearch({ searchValue: value });
    });

    return { searchValue, onChangeSearchValue };
};
