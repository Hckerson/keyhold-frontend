export const sum = (values: number[]) =>
    values.reduce((total, value) => total + value, 0);

export const percentOf = (part: number, whole: number) =>
    whole === 0 ? 0 : Math.round((part / whole) * 100);

export const averageOf = (values: number[]) =>
    values.length === 0 ? 0 : Math.round(sum(values) / values.length);
