const MILLION = 1_000_000;
const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1_440;

export const formatUsd = (value: number) =>
    `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const formatCompactUsd = (value: number) =>
    value >= MILLION
        ? `$${(value / MILLION).toFixed(2)}M`
        : `$${Math.round(value / 1_000)}K`;

export const formatMillions = (value: number, fractionDigits = 1) =>
    `$${(value / MILLION).toFixed(fractionDigits)}M`;

export const formatCount = (value: number) =>
    value.toLocaleString("en-US", { maximumFractionDigits: 0 });

export const formatThousands = (value: number, fractionDigits = 0) =>
    `$${(value / 1_000).toLocaleString("en-US", {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    })}K`;

export const formatAge = (minutes: number) => {
    if (minutes < MINUTES_PER_HOUR) return `${minutes}m`;
    if (minutes < MINUTES_PER_DAY)
        return `${Math.floor(minutes / MINUTES_PER_HOUR)}h`;
    return `${Math.floor(minutes / MINUTES_PER_DAY)}d`;
};

export const toDigits = (value: string) => value.replace(/\D/g, "");

export const formatCurrencyInput = (value: string) => {
    const digits = toDigits(value);
    return digits ? `$${Number(digits).toLocaleString("en-US")}` : "";
};

export const initialsOf = (name: string) =>
    name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
