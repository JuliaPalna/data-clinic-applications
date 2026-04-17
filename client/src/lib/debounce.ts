// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (fn: any): ((...args: any) => void) => {
    let timeId: undefined | number = undefined;

    return (...args) => {
        if (timeId) {
            clearTimeout(timeId);
        }

        timeId = setTimeout(() => {
            fn(...args);
            timeId = undefined;
        }, 1000);
    };
};
