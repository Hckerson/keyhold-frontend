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
    onStageFilterChange: (filter: StageFilter) => void;
    onStatusFilterChange: (filter: StatusFilter) => void;
    onWithdraw: (id: string) => void;
}

export function OffersMain({
    top,
    offers,
    stageFilter,
    statusFilter,
    counts,
    onStageFilterChange,
    onStatusFilterChange,
    onWithdraw,
}: OffersMainProps) {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            {top && <OffersTopHero offer={top} onWithdraw={onWithdraw} />}

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
                    <PanelInset className="mt-0">
                        <OfferTable offers={offers} onWithdraw={onWithdraw} />
                    </PanelInset>
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
