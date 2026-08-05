import { DeltaChip } from "@/components/ui/delta-chip";
import { ReportSignalMark } from "@/components/features/admin/report-signal-mark";
import type { ReportSignal } from "@/lib/types";

export interface ReportSignalRowProps {
    signal: ReportSignal;
}

export function ReportSignalRow({ signal }: ReportSignalRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <ReportSignalMark id={signal.id} />
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {signal.caption}
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {signal.value}
            </td>
            <td className="py-0 pl-3">
                <span className="flex justify-end">
                    <DeltaChip
                        size="sm"
                        value={signal.change}
                        direction={signal.trend}
                    />
                </span>
            </td>
        </tr>
    );
}

ReportSignalRow.displayName = "ReportSignalRow";
