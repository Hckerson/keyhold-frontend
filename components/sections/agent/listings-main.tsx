import { Home } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ListingTable } from "@/components/features/agent/listing-table";
import { ListingsToolbar } from "@/components/sections/agent/listings-toolbar";
import { ListingsTopHero } from "@/components/sections/agent/listings-top-hero";
import type { BulkAction, StatusFilter } from "@/lib/data/agent-listings";
import type { ManagedListing } from "@/lib/types";

const BOOK_TITLE = "Listing Book";
const BOOK_LEDE = "Every property behind your strongest performer";
const BOOK_ACTION = "Open analytics";
const EMPTY_TITLE = "No listings in this status";
const EMPTY_LEDE = "Change the filter or list a new property.";
const LOADING_TITLE = "Loading your listings";
const LOADING_LEDE = "Fetching the latest performance for your portfolio.";

export interface ListingsMainProps {
    top?: ManagedListing;
    listings: ManagedListing[];
    peak: number;
    filter: StatusFilter;
    counts: Record<StatusFilter, number>;
    selectedIds: string[];
    allSelected: boolean;
    pending?: boolean;
    onFilterChange: (filter: StatusFilter) => void;
    onToggleAll: () => void;
    onSelectedChange: (id: string, selected: boolean) => void;
    onClearSelection: () => void;
    onBulkAction: (action: BulkAction) => void;
}

export function ListingsMain({
    top,
    listings,
    peak,
    filter,
    counts,
    selectedIds,
    allSelected,
    pending = false,
    onFilterChange,
    onToggleAll,
    onSelectedChange,
    onClearSelection,
    onBulkAction,
}: ListingsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {top && <ListingsTopHero listing={top} peak={peak} />}

            <Panel
                title={BOOK_TITLE}
                description={BOOK_LEDE}
                count={listings.length}
                action={
                    <PanelLink href="/agent/analytics" label={BOOK_ACTION} />
                }
            >
                <ListingsToolbar
                    filter={filter}
                    counts={counts}
                    selectedCount={selectedIds.length}
                    onFilterChange={onFilterChange}
                    onClearSelection={onClearSelection}
                    onBulkAction={onBulkAction}
                />

                {listings.length > 0 ? (
                    <PanelInset scroll className="mt-0">
                        <ListingTable
                            listings={listings}
                            peak={peak}
                            selectedIds={selectedIds}
                            allSelected={allSelected}
                            onToggleAll={onToggleAll}
                            onSelectedChange={onSelectedChange}
                        />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={Home}
                        title={pending ? LOADING_TITLE : EMPTY_TITLE}
                        description={pending ? LOADING_LEDE : EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

ListingsMain.displayName = "ListingsMain";
