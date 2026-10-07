import {
    formatCompactUsd,
    formatCount,
    formatCountOf,
    percentOf,
    sum,
} from "@/lib/utils";
import type { DonutSegment, ReportMarket, ReportShare } from "@/lib/types";
import type { RegionMetric, UserStats } from "@/lib/validations/stats";

const LISTING_NOUN = "listing";

export const reportMarkets = (regions: RegionMetric[]): ReportMarket[] => {
    const volume = sum(regions.map((region) => region.volume));

    return [...regions]
        .sort((a, b) => b.volume - a.volume)
        .map((region) => ({
            ...region,
            share: percentOf(region.volume, volume),
        }));
};

export const reportShares = (segments: DonutSegment[]): ReportShare[] => {
    const total = sum(segments.map((segment) => segment.value));

    return [...segments]
        .sort((a, b) => b.value - a.value)
        .map((segment) => ({
            id: segment.name,
            label: segment.name,
            count: segment.value,
            share: percentOf(segment.value, total),
        }));
};

export const marketLine = (market: ReportMarket) =>
    `${formatCountOf(market.listings, LISTING_NOUN)} · avg ${formatCompactUsd(market.avgPrice)}`;

export const membersReading = (users: UserStats | undefined) =>
    users
        ? `${formatCount(users.total)} members, ${formatCount(users.active)} active`
        : undefined;

export const rolesLine = (roles: DonutSegment[]) =>
    roles
        .map((role) => `${formatCount(role.value)} ${role.name.toLowerCase()}`)
        .join(" · ");
