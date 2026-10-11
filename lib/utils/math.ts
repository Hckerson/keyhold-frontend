export const sum = (values: number[]) =>
    values.reduce((total, value) => total + value, 0);

export const percentOf = (part: number, whole: number) =>
    whole === 0 ? 0 : Math.round((part / whole) * 100);

export const averageOf = (values: number[]) =>
    values.length === 0 ? 0 : Math.round(sum(values) / values.length);

export const apportion = (values: number[], total: number) => {
    const whole = sum(values);
    if (whole === 0) return values.map(() => 0);

    const exact = values.map((value) => (value / whole) * total);
    const floors = exact.map(Math.floor);
    const byRemainder = exact
        .map((value, index) => ({ index, remainder: value - floors[index] }))
        .sort((a, b) => b.remainder - a.remainder);

    for (const { index } of byRemainder.slice(0, total - sum(floors)))
        floors[index] += 1;
    return floors;
};
