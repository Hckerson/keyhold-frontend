import Link from "next/link";
import { DeltaChip } from "@/components/ui/delta-chip";
import { Sparkline } from "@/components/ui/charts/sparkline";
import { ShareMeter } from "@/components/patterns/share-meter";
import type { BusinessFigure } from "@/lib/types";

const SPARK_HEIGHT = 24;
const NO_DELTA = "—";

export interface BusinessFigureRowProps {
    figure: BusinessFigure;
}

export function BusinessFigureRow({ figure }: BusinessFigureRowProps) {
    return (
        <tr className="border-border-light hover:bg-background-muted ease-smooth h-11 border-b transition-colors duration-200 last:border-b-0">
            <td className="py-0">
                <Link
                    href={figure.href}
                    className="text-text hover:text-accent focus-visible:ring-accent ease-smooth block truncate rounded-md text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    {figure.label}
                </Link>
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs tabular-nums">
                {figure.latest}
            </td>
            <td className="py-0 pl-3">
                {figure.delta ? (
                    <DeltaChip
                        size="sm"
                        value={figure.delta.label}
                        direction={figure.delta.direction}
                    />
                ) : (
                    <span className="text-text-muted text-xs">{NO_DELTA}</span>
                )}
            </td>
            <td className="py-0 pl-3">
                <Sparkline
                    data={figure.points}
                    tone="accent"
                    height={SPARK_HEIGHT}
                />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {figure.total}
            </td>
            <td className="py-0 pl-3">
                <ShareMeter
                    percent={figure.ratio.percent}
                    tone="accent"
                    label={`${figure.label}: ${figure.ratio.percent}% ${figure.ratio.label}`}
                />
            </td>
        </tr>
    );
}

BusinessFigureRow.displayName = "BusinessFigureRow";
