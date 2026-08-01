import type { ReactNode } from "react";
import { SEARCH_TOOLBAR_HEADING_ID } from "@/components/sections/search/search-toolbar";

export const SEARCH_RESULTS_ANCHOR = "results";

export interface SearchResultsPanelProps {
    toolbar: ReactNode;
    filters?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
}

export function SearchResultsPanel({
    toolbar,
    filters,
    footer,
    children,
}: SearchResultsPanelProps) {
    return (
        <section
            id={SEARCH_RESULTS_ANCHOR}
            aria-labelledby={SEARCH_TOOLBAR_HEADING_ID}
            className="border-border bg-background-muted flex min-w-0 flex-col overflow-hidden rounded-xl border shadow-sm"
        >
            {toolbar}
            {filters}
            <div className="bg-background flex-1 p-3">{children}</div>
            {footer}
        </section>
    );
}

SearchResultsPanel.displayName = "SearchResultsPanel";
