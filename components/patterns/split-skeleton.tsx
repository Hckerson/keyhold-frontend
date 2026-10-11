import type { ReactNode } from "react";
import { PanelSkeleton } from "@/components/patterns/panel-skeleton";

export interface SplitSkeletonProps {
    main: readonly number[];
    rail: readonly number[];
    lead?: ReactNode;
}

export function SplitSkeleton({ main, rail, lead }: SplitSkeletonProps) {
    return (
        <div className="console-split gap-3">
            <div className="console-span-2 flex min-w-0 flex-col gap-3">
                {lead}
                {main.map((rows, slot) => (
                    <PanelSkeleton key={slot} rows={rows} />
                ))}
            </div>
            <div className="flex min-w-0 flex-col gap-3">
                {rail.map((rows, slot) => (
                    <PanelSkeleton key={slot} rows={rows} />
                ))}
            </div>
        </div>
    );
}

SplitSkeleton.displayName = "SplitSkeleton";
