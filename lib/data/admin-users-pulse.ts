import { format, startOfMonth, subMonths } from "date-fns";
import { RECENCY_BANDS } from "@/lib/config/user-tones";
import { monthLabel, monthOverMonth } from "@/lib/data/admin-overview";
import { idleDays, sortUsers } from "@/lib/data/admin-users";
import {
    countUsersByStatus,
    directoryVolume,
    peakVolume,
    userRoleSegments,
    userRoleTiles,
    userStatusTiles,
    directoryReading,
} from "@/lib/data/admin-users-totals";
import { formatCount, parseLocalDate, percentOf } from "@/lib/utils";
import type {
    ManagedUser,
    UserRecencyBand,
    UserSignupTrend,
} from "@/lib/types";

const TREND_MONTHS = 12;
const MONTH_KEY = "yyyy-MM";
const LEADER_COUNT = 5;
const DECISION_LIMIT = 6;
const RECENCY_LABELS = ["This week", "This month", "This quarter", "Dormant"];
const DORMANT_TONE = "error";
const WAITING_STATUSES = new Set(["suspended", "pending"]);

export const signupTrend = (
    users: ManagedUser[],
    now = new Date(),
): UserSignupTrend => {
    const points = Array.from({ length: TREND_MONTHS }, (_, index) => {
        const name = format(
            subMonths(startOfMonth(now), TREND_MONTHS - 1 - index),
            MONTH_KEY,
        );
        return {
            name,
            value: users.filter(
                (user) =>
                    format(parseLocalDate(user.joinDate), MONTH_KEY) === name,
            ).length,
        };
    });
    const latest = points[points.length - 1];

    return {
        months: points.map((point) => point.value),
        latest: latest.value,
        latestLabel: monthLabel(latest.name),
        delta: monthOverMonth(points),
    };
};

export const recencyBands = (users: ManagedUser[]): UserRecencyBand[] => {
    const live = users.filter((user) => user.status !== "deleted");
    const ceilings = [
        ...RECENCY_BANDS.map((band) => band.ceiling),
        Number.POSITIVE_INFINITY,
    ];

    return RECENCY_LABELS.map((label, index) => {
        const floor = index === 0 ? 0 : ceilings[index - 1];
        const count = live.filter((user) => {
            const days = idleDays(user);
            return days >= floor && days < ceilings[index];
        }).length;

        return {
            id: label,
            label,
            count,
            percent: percentOf(count, live.length),
            tone: RECENCY_BANDS[index]?.tone ?? DORMANT_TONE,
        };
    });
};

export const leadingAccounts = (users: ManagedUser[]) =>
    sortUsers(
        users.filter((user) => user.volume > 0),
        "volume",
    ).slice(0, LEADER_COUNT);

export const waitingAccounts = (users: ManagedUser[]) =>
    sortUsers(
        users.filter((user) => WAITING_STATUSES.has(user.status)),
        "priority",
    );

export const waitingReading = (users: ManagedUser[]) => {
    const counts = countUsersByStatus(users);

    if (counts.suspended + counts.pending === 0)
        return "No account is waiting on a decision";
    return `${formatCount(counts.suspended)} suspended · ${formatCount(counts.pending)} pending verification`;
};

export const userDesk = (users: ManagedUser[]) => {
    const waiting = waitingAccounts(users);

    return {
        tiles: userStatusTiles(users),
        roles: userRoleTiles(users),
        roleSegments: userRoleSegments(users),
        reading: directoryReading(users),
        signups: signupTrend(users),
        recency: recencyBands(users),
        leaders: leadingAccounts(users),
        waiting: waiting.slice(0, DECISION_LIMIT),
        waitingTotal: waiting.length,
        waitingReading: waitingReading(users),
        peak: peakVolume(users),
        volume: directoryVolume(users),
    };
};
