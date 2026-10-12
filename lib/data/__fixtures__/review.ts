import type { ReviewQueueItem } from "@/lib/types";

export const REVIEW_ITEMS: ReviewQueueItem[] = ["Ada", "Ben", "Cy"].map(
    (name) => ({
        id: name,
        title: name,
        caption: "Passport · Buyer",
        moment: "2d",
    }),
);
