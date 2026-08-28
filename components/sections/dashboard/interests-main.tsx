import { Handshake } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { InterestTable } from "@/components/features/dashboard/interest-table";
import { InterestsToolbar } from "@/components/sections/dashboard/interests-toolbar";
import { InterestsTopHero } from "@/components/sections/dashboard/interests-top-hero";
import { BUYER_ROUTES } from "@/lib/constants";
import type { StageFilter, StatusFilter } from "@/lib/data/interests";
import type { Interest } from "@/lib/types";

const BOOK_TITLE = "Introductions";
const BOOK_LEDE = "Every enquiry behind the one that has moved furthest";
const BOOK_ACTION = "Saved properties";
const EMPTY_TITLE = "Nothing matches this filter";
const EMPTY_LEDE = "Widen the stage or status filter to see more enquiries.";
const NONE_TITLE = "No interest registered yet";
const NONE_LEDE =
    "Register your interest on a residence and the listing office appears here.";
const LOADING_TITLE = "Loading your enquiries";
const LOADING_LEDE = "Fetching every introduction on your book.";

export interface InterestsMainProps {
    top?: Interest;
    interests: Interest[];
    total: number;
    stageFilter: StageFilter;
    statusFilter: StatusFilter;
    counts: Record<StageFilter, number>;
    pending?: boolean;
    onStageFilterChange: (filter: StageFilter) => void;
    onStatusFilterChange: (filter: StatusFilter) => void;
}

export function InterestsMain({
    top,
    interests,
    total,
    stageFilter,
    statusFilter,
    counts,
    pending,
    onStageFilterChange,
    onStatusFilterChange,
}: InterestsMainProps) {
    const emptyTitle = total === 0 ? NONE_TITLE : EMPTY_TITLE;
    const emptyLede = total === 0 ? NONE_LEDE : EMPTY_LEDE;

    return (
        <div className="console-span-2 flex flex-col gap-3">
            {top && <InterestsTopHero interest={top} />}

            <Panel
                title={BOOK_TITLE}
                description={BOOK_LEDE}
                count={interests.length}
                action={
                    <PanelLink href={BUYER_ROUTES.saved} label={BOOK_ACTION} />
                }
            >
                <InterestsToolbar
                    stageFilter={stageFilter}
                    statusFilter={statusFilter}
                    counts={counts}
                    onStageFilterChange={onStageFilterChange}
                    onStatusFilterChange={onStatusFilterChange}
                />

                {interests.length > 0 ? (
                    <PanelInset scroll>
                        <InterestTable interests={interests} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={Handshake}
                        title={pending ? LOADING_TITLE : emptyTitle}
                        description={pending ? LOADING_LEDE : emptyLede}
                    />
                )}
            </Panel>
        </div>
    );
}

InterestsMain.displayName = "InterestsMain";
