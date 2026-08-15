interface LedgerEntry {
    label: string;
    value: string;
}

export interface SearchResultLedgerProps {
    beds: number;
    baths: number;
    sqft: number;
    yearBuilt: number;
}

export function SearchResultLedger({
    beds,
    baths,
    sqft,
    yearBuilt,
}: SearchResultLedgerProps) {
    const entries: LedgerEntry[] = [
        { label: "Bd", value: String(beds) },
        { label: "Ba", value: String(baths) },
        { label: "Sq ft", value: sqft.toLocaleString() },
        { label: "Built", value: String(yearBuilt) },
    ];

    return (
        <dl className="divide-border-light border-border-light bg-background-alt grid grid-cols-4 divide-x rounded-md border">
            {entries.map((entry) => (
                <div
                    key={entry.label}
                    className="flex flex-col gap-0.5 px-2 py-1.5"
                >
                    <dt className="micro-label">{entry.label}</dt>
                    <dd className="text-text truncate text-xs font-medium tabular-nums">
                        {entry.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

SearchResultLedger.displayName = "SearchResultLedger";
