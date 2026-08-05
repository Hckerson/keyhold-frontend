import Link from "next/link";
import { Heart } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { buttonVariants } from "@/components/ui/button";
import { PanelLink } from "@/components/features/shared/panel-link";
import { SavedTable } from "@/components/features/dashboard/saved-table";
import { SavedToolbar } from "@/components/sections/dashboard/saved-toolbar";
import { SavedTopHero } from "@/components/sections/dashboard/saved-top-hero";
import type {
    SavedSortKey,
    SavedStatusFilter,
} from "@/lib/data/saved-listings";
import type { SavedListing } from "@/lib/types";

const BOOK_TITLE = "Saved Book";
const BOOK_LEDE = "Every property behind the one closest to a decision";
const BOOK_ACTION = "Open alerts";
const EMPTY_TITLE = "Nothing saved in this view";
const EMPTY_LEDE =
    "Widen the status filter, or keep browsing to build out your book.";
const EMPTY_ACTION = "Start Browsing";

export interface SavedMainProps {
    top?: SavedListing;
    listings: SavedListing[];
    filter: SavedStatusFilter;
    sort: SavedSortKey;
    counts: Record<SavedStatusFilter, number>;
    onFilterChange: (filter: SavedStatusFilter) => void;
    onSortChange: (sort: SavedSortKey) => void;
    onRemove: (id: string) => void;
}

export function SavedMain({
    top,
    listings,
    filter,
    sort,
    counts,
    onFilterChange,
    onSortChange,
    onRemove,
}: SavedMainProps) {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            {top && <SavedTopHero listing={top} onRemove={onRemove} />}

            <Panel
                title={BOOK_TITLE}
                description={BOOK_LEDE}
                count={listings.length}
                action={
                    <PanelLink href="/dashboard/alerts" label={BOOK_ACTION} />
                }
            >
                <SavedToolbar
                    filter={filter}
                    sort={sort}
                    counts={counts}
                    onFilterChange={onFilterChange}
                    onSortChange={onSortChange}
                />

                {listings.length > 0 ? (
                    <PanelInset flush className="mt-0">
                        <SavedTable listings={listings} onRemove={onRemove} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={Heart}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                        action={
                            <Link
                                href="/search"
                                className={buttonVariants({
                                    variant: "secondary",
                                    size: "sm",
                                })}
                            >
                                {EMPTY_ACTION}
                            </Link>
                        }
                    />
                )}
            </Panel>
        </div>
    );
}

SavedMain.displayName = "SavedMain";
