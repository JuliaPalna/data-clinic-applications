import { IMaskInput } from 'react-imask';
import { cn } from '@/lib/utils';
import type { ControllerRenderProps } from 'react-hook-form';

function InputMaskPhone({ field, ...props }: { field: ControllerRenderProps }) {
    return (
        <IMaskInput
            value={field.value || ''}
            type="tel"
            mask="+7-000-000-00-00"
            lazy={false}
            placeholderChar="_"
            inputMode="tel"
            data-slot="input"
            onAccept={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            className={cn(`h-8 w-full min-w-0 rounded-lg border border-input bg-transparent
                px-2.5 py-1 text-base transition-colors
                outline-none placeholder:text-muted-foreground
                focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50
                disabled:pointer-events-none disabled:cursor-not-allowed
                disabled:bg-input/50 disabled:opacity-50
                aria-invalid:border-destructive aria-invalid:ring-3
                aria-invalid:ring-destructive/20 md:text-sm`)}
            {...props}
        />
    );
}

export { InputMaskPhone };
