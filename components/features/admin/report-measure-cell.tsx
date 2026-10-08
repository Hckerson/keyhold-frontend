import { DeltaChip } from "@/components/ui/delta-chip";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReportMeasure } from "@/lib/types";

const AGAINST = "vs";

export interface ReportMeasureCellProps {
    measure: ReportMeasure;
    pending?: boolean;
}

export function ReportMeasureCell({
    measure,
    pending,
}: ReportMeasureCellProps) {
    const against = measure.against && `${AGAINST} ${measure.against}`;

    return (
        <div className="bg-background flex min-w-0 flex-col gap-2 px-4 pt-3.5 pb-3">
            <dt className="micro-label truncate">{measure.label}</dt>
            <dd className="flex min-w-0 flex-col gap-2">
                {pending ? (
                    <Skeleton className="h-6 w-20" />
                ) : (
                    <span className="font-display text-h5 text-text leading-none font-light">
                        {measure.total}
                    </span>
                )}
                <span className="text-text-secondary flex h-4 min-w-0 items-center gap-1.5 text-xs tabular-nums">
                    {pending ? (
                        <Skeleton className="h-3 w-16" />
                    ) : (
                        <>
                            <span className="truncate">{measure.latest}</span>
                            {measure.delta && (
                                <span title={against ?? undefined}>
                                    <DeltaChip
                                        size="sm"
                                        value={measure.delta.label}
                                        direction={measure.delta.direction}
                                    />
                                    <span className="sr-only"> {against}</span>
                                </span>
                            )}
                        </>
                    )}
                </span>
            </dd>
        </div>
    );
}

ReportMeasureCell.displayName = "ReportMeasureCell";
