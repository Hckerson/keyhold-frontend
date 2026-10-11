import type { ReactNode } from "react";
import { ConsoleSkeletonHeader } from "@/components/patterns/console-skeleton-header";
import { FlowBandSkeleton } from "@/components/patterns/flow-band-skeleton";
import { LeadBandSkeleton } from "@/components/patterns/lead-band-skeleton";
import { PanelSkeleton } from "@/components/patterns/panel-skeleton";
import { SplitSkeleton } from "@/components/patterns/split-skeleton";
import { StatBand } from "@/components/patterns/stat-band";
import { TileBandSkeleton } from "@/components/patterns/tile-band-skeleton";
import type { ConsoleSkeletonVariant } from "@/lib/config/console-skeletons";

const BUSY_LABEL = "Loading";
const PILL_SLOTS = [0, 1, 2, 3];
const STAGE_ROWS = 3;
const RAIL_ROWS = 4;
const BAND_CELLS = 4;
const RECORD_CELLS = 3;
const STATUS_TILES = { sixths: 6, fifths: 5 };

const STANDARD = { main: [2, 6], rail: [4, 4] };
const QUEUE = { main: [6, 3], rail: [6] };
const DIRECTORY = { main: [6], rail: [2, 4, 5] };
const RECORD = { main: [6, 6], rail: [3, 3] };

const BAND = <StatBand label={BUSY_LABEL} stats={[]} pending />;
const SPLIT = <SplitSkeleton {...STANDARD} />;

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
    sixths: (
        <>
            <TileBandSkeleton
                tiles={STATUS_TILES.sixths}
                className="console-split--sixths"
            />
            <SplitSkeleton {...QUEUE} />
        </>
    ),
    fifths: (
        <>
            <TileBandSkeleton
                tiles={STATUS_TILES.fifths}
                className="console-split--fifths"
            />
            <SplitSkeleton {...DIRECTORY} />
        </>
    ),
    flow: (
        <>
            <FlowBandSkeleton
                cells={BAND_CELLS}
                className="console-split--flow"
            />
            <PanelSkeleton tall />
        </>
    ),
    lead: (
        <>
            <LeadBandSkeleton cells={BAND_CELLS} />
            <PanelSkeleton tall />
        </>
    ),
    profile: (
        <SplitSkeleton
            {...RECORD}
            lead={
                <FlowBandSkeleton
                    cells={RECORD_CELLS}
                    className="console-split--flow console-split--flow-thirds"
                />
            }
        />
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
    casework: (
        <div className="review-split review-split--slim items-start gap-3">
            <PanelSkeleton rows={RAIL_ROWS} />
            <PanelSkeleton tall />
        </div>
    ),
};

export interface ConsoleSkeletonProps {
    variant?: ConsoleSkeletonVariant;
}

export function ConsoleSkeleton({ variant = "split" }: ConsoleSkeletonProps) {
    return (
        <div className="flex w-full flex-col gap-4" aria-busy="true">
            <ConsoleSkeletonHeader identity={variant === "profile"} />
            {BODIES[variant]}
        </div>
    );
}

ConsoleSkeleton.displayName = "ConsoleSkeleton";
