import Link from "next/link";
import { DeltaChip } from "@/components/ui/delta-chip";
import { Sparkline } from "@/components/ui/charts/sparkline";
import { ShareMeter } from "@/components/patterns/share-meter";
import type { BusinessFigure } from "@/lib/types";

const SPARK_HEIGHT = 28;
const NO_DELTA = "—";

export interface FigureCellProps {
    figure: BusinessFigure;
}

export function FigureCell({ figure }: FigureCellProps) {
    return (
        <Link
            href={figure.href}
            className="hover:bg-background-alt focus-visible:ring-accent ease-smooth flex min-w-0 flex-col gap-2 p-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
            <span className="flex items-center justify-between gap-2">
                <span className="micro-label truncate">{figure.label}</span>
                {figure.delta ? (
                    <DeltaChip
                        size="sm"
                        value={figure.delta.label}
                        direction={figure.delta.direction}
                    />
                ) : (
                    <span className="text-text-muted text-xs">{NO_DELTA}</span>
                )}
            </span>
            <Sparkline
                data={figure.points}
                tone="accent"
                height={SPARK_HEIGHT}
            />
            <span className="flex items-baseline justify-between gap-2 text-xs tabular-nums">
                <span className="text-text-secondary truncate">
                    {figure.latest}
                </span>
                <span className="text-text shrink-0 font-semibold">
                    {figure.total}
                </span>
            </span>
            <span className="flex items-center gap-2">
                <ShareMeter
                    percent={figure.ratio.percent}
                    tone="accent"
                    label={`${figure.label}: ${figure.ratio.percent}% ${figure.ratio.label}`}
                    className="min-w-0 flex-1"
                    barClassName="w-auto flex-1"
                />
                <span className="text-text-muted shrink-0 truncate text-xs">
                    {figure.ratio.label}
                </span>
            </span>
        </Link>
    );
}

FigureCell.displayName = "FigureCell";
