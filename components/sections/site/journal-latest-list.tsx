import { JournalListingRow } from "@/components/sections/site/journal-listing-row";
import { JOURNAL_COPY as COPY, type JournalLatest } from "@/lib/data/journal";

export function JournalLatestList({ latest }: { latest: JournalLatest }) {
    return (
        <section
            aria-label={COPY.latestLabel}
            className="bg-background min-w-0"
        >
            <header className="border-border-light flex h-9 items-center justify-between gap-3 border-b px-4">
                <p className="micro-label truncate">{COPY.latestLabel}</p>
                <p className="micro-label shrink-0 tabular-nums">
                    {COPY.latestTotal(latest.total)}
                </p>
            </header>

            <ul className="divide-border-light divide-y">
                {latest.listings.map((listing) => (
                    <li key={listing.id}>
                        <JournalListingRow listing={listing} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

JournalLatestList.displayName = "JournalLatestList";
