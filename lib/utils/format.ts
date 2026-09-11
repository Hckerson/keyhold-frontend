import { LOCALE } from "@/lib/constants";

const MILLION = 1_000_000;
const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1_440;

const wholeNumber = new Intl.NumberFormat(LOCALE, {
    maximumFractionDigits: 0,
});

const fixedNumber = (fractionDigits: number) =>
    new Intl.NumberFormat(LOCALE, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    });

const clock = new Intl.DateTimeFormat(LOCALE, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
});

const dayAndMonth = new Intl.DateTimeFormat(LOCALE, {
    month: "short",
    day: "numeric",
});

const weekdayAndTime = new Intl.DateTimeFormat(LOCALE, {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
});

export const formatClock = (value: Date) => clock.format(value);

export const formatDayAndMonth = (value: Date) => dayAndMonth.format(value);

export const formatWeekdayAndTime = (value: Date) =>
    weekdayAndTime.format(value);

export const formatUsd = (value: number) => `$${wholeNumber.format(value)}`;

export const formatCompactUsd = (value: number) =>
    value >= MILLION
        ? `$${(value / MILLION).toFixed(2)}M`
        : `$${Math.round(value / 1_000)}K`;

export const formatMillions = (value: number, fractionDigits = 1) =>
    `$${(value / MILLION).toFixed(fractionDigits)}M`;

export const formatCount = (value: number) => wholeNumber.format(value);

export const formatThousands = (value: number, fractionDigits = 0) =>
    `$${fixedNumber(fractionDigits).format(value / 1_000)}K`;

export const formatScaled = (
    value: number,
    { divideBy = 1, fractionDigits = 0 } = {},
) => fixedNumber(fractionDigits).format(value / divideBy);

export const formatAge = (minutes: number) => {
    if (minutes < MINUTES_PER_HOUR) return `${minutes}m`;
    if (minutes < MINUTES_PER_DAY)
        return `${Math.floor(minutes / MINUTES_PER_HOUR)}h`;
    return `${Math.floor(minutes / MINUTES_PER_DAY)}d`;
};

export const toDigits = (value: string) => value.replace(/\D/g, "");

export const formatCurrencyInput = (value: string) => {
    const digits = toDigits(value);
    return digits ? `$${wholeNumber.format(Number(digits))}` : "";
};

export const initialsOf = (name: string) =>
    name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const mailHref = (email: string, subject?: string) =>
    subject
        ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
        : `mailto:${email}`;

const ELLIPSIS = "…";

export const clamp = (value: string, limit: number) => {
    const text = value.trim();
    if (text.length <= limit) return text;

    const cut = text.slice(0, limit - 1);
    const lastSpace = cut.lastIndexOf(" ");
    return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}${ELLIPSIS}`;
};
