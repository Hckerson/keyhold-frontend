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
