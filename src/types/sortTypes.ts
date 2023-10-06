export type SortConfigType<T> = {
    field: keyof T | null;
    direction: 'asc' | 'desc';
    prevField: keyof T | null;
    prevDirection: 'asc' | 'desc';
};
