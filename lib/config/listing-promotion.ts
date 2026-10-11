import type { Choice } from "@/lib/types";

export const MIN_PROMOTION_DAYS = 1;
export const MAX_PROMOTION_DAYS = 90;

export type PromotionSpan = "7" | "14" | "30";

export const PROMOTION_SPANS: readonly Choice<PromotionSpan>[] = [
    { id: "7", label: "One week", caption: "7 days" },
    { id: "14", label: "Two weeks", caption: "14 days" },
    { id: "30", label: "One month", caption: "30 days" },
];

export const DEFAULT_PROMOTION_SPAN: PromotionSpan = "14";

export const PROMOTION_COPY = {
    title: "Promote this listing",
    hint: "A promoted listing is featured ahead of the rest of the market for the span you choose. Promoting again extends the run.",
    span: "How long it stays featured",
    featuredUntil: "Featured until",
    cancel: "Not now",
    confirm: "Promote listing",
    failed: "That listing could not be promoted.",
    retry: "Try again in a moment.",
} as const;
