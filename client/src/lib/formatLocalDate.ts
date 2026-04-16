export const formatLocalDate = (timestamp: number): string => {
    const localDate: Date = new Date(Number(timestamp));

    if (!checkValidDate(localDate)) {
        return 'Некорректная дата';
    }

    const year: number = localDate.getFullYear();
    const month: string = String(localDate.getMonth() + 1).padStart(2, '0');
    const day: string = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

function checkValidDate(date: Date) {
    return !isNaN(date.getTime());
}
