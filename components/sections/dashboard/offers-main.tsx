import { FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { OfferTable } from "@/components/features/dashboard/offer-table";
import { OffersToolbar } from "@/components/sections/dashboard/offers-toolbar";
import { OffersTopHero } from "@/components/sections/dashboard/offers-top-hero";
import type { StageFilter, StatusFilter } from "@/lib/data/offers";
import type { Offer } from "@/lib/types";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";

const BOOK_TITLE = "Offer Book";
const BOOK_LEDE = "Every position behind the one carrying the most weight";
const BOOK_ACTION = "Saved properties";
const EMPTY_TITLE = "Nothing matches this filter";
const EMPTY_LEDE = "Widen the stage or status filter to see more positions.";

export interface OffersMainProps {
    top?: Offer;
    offers: Offer[];
    stageFilter: StageFilter;
    statusFilter: StatusFilter;
    counts: Record<StageFilter, number>;
    pending?: boolean;
    onStageFilterChange: (filter: StageFilter) => void;
    onStatusFilterChange: (filter: StatusFilter) => void;
}

export function OffersMain({
    top,
    offers,
    stageFilter,
    statusFilter,
    counts,
    pending,
    onStageFilterChange,
    onStatusFilterChange,
}: OffersMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {top && <OffersTopHero offer={top} />}

            <Panel
                title={BOOK_TITLE}
                description={BOOK_LEDE}
                count={offers.length}
                action={
                    <PanelLink href="/dashboard/saved" label={BOOK_ACTION} />
                }
            >
                <OffersToolbar
                    stageFilter={stageFilter}
                    statusFilter={statusFilter}
                    counts={counts}
                    onStageFilterChange={onStageFilterChange}
                    onStatusFilterChange={onStatusFilterChange}
                />

                {offers.length > 0 ? (
                    <PanelInset scroll>
                        <OfferTable offers={offers} />
                    </PanelInset>
                ) : pending ? (
                    <SkeletonRows />
                ) : (
                    <EmptyState
                        icon={FileText}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

OffersMain.displayName = "OffersMain";
