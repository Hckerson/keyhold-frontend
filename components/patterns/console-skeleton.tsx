import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PanelSkeleton } from "@/components/patterns/panel-skeleton";
import { StatBand } from "@/components/patterns/stat-band";
import type { ConsoleSkeletonVariant } from "@/lib/config/console-skeletons";

const BUSY_LABEL = "Loading";
const TILE_SLOTS = [0, 1, 2, 3, 4, 5];
const PILL_SLOTS = [0, 1, 2, 3];
const STAGE_ROWS = 3;
const HERO_ROWS = 2;
const RAIL_ROWS = 4;

const SPLIT = (
    <div className="console-split gap-3">
        <div className="console-span-2 flex flex-col gap-3">
            <PanelSkeleton rows={HERO_ROWS} />
            <PanelSkeleton />
        </div>
        <div className="flex flex-col gap-3">
            <PanelSkeleton rows={RAIL_ROWS} />
            <PanelSkeleton rows={RAIL_ROWS} />
        </div>
    </div>
);

const BAND = <StatBand label={BUSY_LABEL} stats={[]} pending />;

const BODIES: Record<ConsoleSkeletonVariant, ReactNode> = {
    split: (
        <>
            {BAND}
            {SPLIT}
        </>
    ),
    form: SPLIT,
    stack: (
        <>
            {BAND}
            <PanelSkeleton />
        </>
    ),
    quarters: (
        <>
            {BAND}
            <div className="console-split console-split--quarters gap-3">
                <PanelSkeleton />
                <PanelSkeleton className="console-span-3" />
            </div>
        </>
    ),
    thread: (
        <>
            {BAND}
            <div className="console-split console-split--quarters gap-3">
                <PanelSkeleton tall />
                <PanelSkeleton className="console-span-2" />
                <PanelSkeleton rows={RAIL_ROWS} />
            </div>
        </>
    ),
    tiles: (
        <>
            <div className="console-split console-split--sixths gap-2">
                {TILE_SLOTS.map((slot) => (
                    <Skeleton key={slot} className="h-20 rounded-lg" />
                ))}
            </div>
            {SPLIT}
        </>
    ),
    deck: (
        <div className="console-split gap-3">
            <PanelSkeleton rows={RAIL_ROWS} className="console-span-3" />
            <PanelSkeleton className="console-span-2" />
            <PanelSkeleton />
            <PanelSkeleton />
            <PanelSkeleton className="console-span-2" />
        </div>
    ),
    board: (
        <div className="card-grid gap-3">
            {PILL_SLOTS.map((slot) => (
                <PanelSkeleton key={slot} rows={STAGE_ROWS} tall />
            ))}
        </div>
    ),
    review: (
        <>
            <div className="flex flex-wrap gap-2">
                {PILL_SLOTS.map((slot) => (
                    <Skeleton key={slot} className="h-8 w-20 rounded-lg" />
                ))}
            </div>
            <div className="review-split items-start gap-3">
                <PanelSkeleton tall />
                <PanelSkeleton />
            </div>
        </>
    ),
};

export interface ConsoleSkeletonProps {
    variant?: ConsoleSkeletonVariant;
}

export function ConsoleSkeleton({ variant = "split" }: ConsoleSkeletonProps) {
    return (
        <div className="flex w-full flex-col gap-4" aria-busy="true">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-3 w-full max-w-md" />
            </div>
            {BODIES[variant]}
        </div>
    );
}

ConsoleSkeleton.displayName = "ConsoleSkeleton";
