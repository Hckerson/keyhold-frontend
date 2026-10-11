import { daysBetween } from "@/lib/utils/elapsed";
import {
    formatCount,
    formatCountOf,
    formatDayAndMonth,
    formatFullDate,
} from "@/lib/utils";
import type { ReviewClock } from "@/lib/types";

const DAY_NOUN = "day";

const time = (iso: string) => new Date(iso).getTime();

const decisionDate = (clock: ReviewClock) =>
    new Date(clock.decidedAt ?? clock.openedAt);

const orderKey = (clock: ReviewClock) =>
    clock.open ? time(clock.openedAt) : -decisionDate(clock).getTime();

export const daysOpen = (clock: ReviewClock, now = new Date()) =>
    daysBetween(clock.openedAt, now.toISOString());

export const byReviewOrder = (a: ReviewClock, b: ReviewClock) =>
    Number(!a.open) - Number(!b.open) || orderKey(a) - orderKey(b);

export const reviewMoment = (clock: ReviewClock, now = new Date()) =>
    clock.open
        ? `${daysOpen(clock, now)}d`
        : formatDayAndMonth(decisionDate(clock));

export const openFor = (clock: ReviewClock, now = new Date()) =>
    formatCountOf(daysOpen(clock, now), DAY_NOUN);

export const decidedOn = (clock: ReviewClock) =>
    formatFullDate(decisionDate(clock));

export const reviewReading = (
    clocks: ReviewClock[],
    copy: { open: string; none: string },
    now = new Date(),
) => {
    const open = clocks.filter((clock) => clock.open);
    if (open.length === 0) return copy.none;
    const oldest = Math.max(...open.map((clock) => daysOpen(clock, now)));
    return `${formatCount(open.length)} ${copy.open} · oldest ${formatCountOf(oldest, DAY_NOUN)}`;
};
