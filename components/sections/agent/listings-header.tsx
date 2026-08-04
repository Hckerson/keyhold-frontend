import { Button } from "@/components/ui/button";

const LISTINGS_TITLE = "My Listings";
const LISTINGS_LEDE = "Exposure, demand and time on market across your book";
const ADD_ACTION = "List New Property";

export interface ListingsHeaderProps {
    summary: string;
}

export function ListingsHeader({ summary }: ListingsHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {LISTINGS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {LISTINGS_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Button type="button" variant="primary" size="sm">
                    {ADD_ACTION}
                </Button>
            </div>
        </header>
    );
}

ListingsHeader.displayName = "ListingsHeader";
