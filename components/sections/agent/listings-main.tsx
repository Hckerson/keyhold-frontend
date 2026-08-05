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

export interface ListingsMainProps {
    top?: ManagedListing;
    listings: ManagedListing[];
    peak: number;
    filter: StatusFilter;
    counts: Record<StatusFilter, number>;
    selectedIds: string[];
    allSelected: boolean;
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
    onFilterChange,
    onToggleAll,
    onSelectedChange,
    onClearSelection,
    onBulkAction,
}: ListingsMainProps) {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
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
                    <PanelInset flush className="mt-0">
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
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

ListingsMain.displayName = "ListingsMain";
