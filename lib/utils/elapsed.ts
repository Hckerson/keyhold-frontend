const MS_PER_MINUTE = 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_MONTH = 30;

export const daysBetween = (from: string, to: string) =>
    Math.max(
        0,
        Math.round(
            (new Date(to).getTime() - new Date(from).getTime()) / MS_PER_DAY,
        ),
    );

export const daysSince = (iso: string) =>
    daysBetween(iso, new Date().toISOString());

export const monthsSince = (iso: string) =>
    Math.max(1, Math.round(daysSince(iso) / DAYS_PER_MONTH));

export const elapsedLabel = (iso: string) => {
    const days = daysSince(iso);
    return days < DAYS_PER_MONTH ? `${days}d` : `${monthsSince(iso)}mo`;
};

export const minutesSince = (iso: string, now = new Date()) =>
    Math.max(
        0,
        Math.round((now.getTime() - new Date(iso).getTime()) / MS_PER_MINUTE),
    );
