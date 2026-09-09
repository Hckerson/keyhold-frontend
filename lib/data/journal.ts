export interface JournalEntry {
    id: string;
    title: string;
    lede: string;
    author: string;
    publishedAt: string;
    href: string;
}

export const JOURNAL_ENTRIES: readonly JournalEntry[] = [];

export const JOURNAL_COPY = {
    eyebrow: "Journal",
    title: "Notes on the market",
    lede: "Occasional writing on architecture, pricing and the mechanics of buying at this end of the market.",
    emptyTitle: "Nothing published yet",
    emptyLede:
        "The first dispatch is being written. In the meantime, the listings are the more interesting read.",
    emptyAction: "Browse listings",
    emptyHref: "/search",
} as const;
