import { format, startOfMonth, subMonths } from "date-fns";
import { RECENCY_BANDS } from "@/lib/config/user-tones";
import { monthLabel, monthOverMonth } from "@/lib/data/admin-overview";
import { idleDays, sortUsers } from "@/lib/data/admin-users";
import {
    directoryVolume,
    peakVolume,
    rolesReading,
    userRoleOptions,
    userStatusTiles,
} from "@/lib/data/admin-users-totals";
import { parseLocalDate, percentOf, sum } from "@/lib/utils";
import type {
    LeaderConcentration,
    ManagedUser,
    UserRecencyBand,
    UserSignupTrend,
} from "@/lib/types";

const TREND_MONTHS = 12;
const MONTH_KEY = "yyyy-MM";
export const LEADER_COUNT = 5;
const RECENCY_LABELS = ["This week", "This month", "This quarter", "Dormant"];
const DORMANT_TONE = "error";

export const signupTrend = (
    users: ManagedUser[],
    now = new Date(),
): UserSignupTrend => {
    const lastFullMonth = subMonths(startOfMonth(now), 1);
    const points = Array.from({ length: TREND_MONTHS }, (_, index) => {
        const name = format(
            subMonths(lastFullMonth, TREND_MONTHS - 1 - index),
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

export const leaderConcentration = (
    leaders: ManagedUser[],
    users: ManagedUser[],
): LeaderConcentration => {
    const volume = sum(leaders.map((user) => user.volume));
    const total = directoryVolume(users);

    return {
        share: percentOf(volume, total),
        volume,
        total,
        leaders: leaders.length,
        accounts: users.length,
    };
};

export const userDesk = (users: ManagedUser[]) => ({
    tiles: userStatusTiles(users),
    roleOptions: userRoleOptions(users),
    rolesReading: rolesReading(users),
    signups: signupTrend(users),
    recency: recencyBands(users),
    leaders: leadingAccounts(users),
    concentration: leaderConcentration(leadingAccounts(users), users),
    peak: peakVolume(users),
    volume: directoryVolume(users),
});
