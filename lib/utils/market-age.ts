import { NEW_LISTING_DAYS, STALE_LISTING_DAYS } from "@/lib/constants";

export const describeMarketAge = (days: number) => {
    if (days <= NEW_LISTING_DAYS) {
        return {
            label: days <= 1 ? "Listed today" : `${days} days new`,
            tone: "text-highlight-dark",
        };
    }

    return {
        label: `${days} days listed`,
        tone:
            days >= STALE_LISTING_DAYS
                ? "text-text-muted"
                : "text-text-secondary",
    };
};
