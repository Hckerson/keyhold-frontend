export const ARROW_STEPS: Record<string, number> = {
    ArrowDown: 1,
    ArrowUp: -1,
};

export const rovingIndex = (
    current: number,
    delta: number,
    length: number,
): number => {
    if (length === 0) return 0;
    return (((current + delta) % length) + length) % length;
};
