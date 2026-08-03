import { ReportDelta } from "@/components/features/admin/report-delta";
import type { ReportSignal } from "@/lib/data/admin-reports";

export interface ReportSignalListProps {
    signals: ReportSignal[];
}

function SignalRow({ signal }: { signal: ReportSignal }) {
    return (
        <li className="flex items-center justify-between gap-3 py-2.5">
            <div className="min-w-0">
                <p className="micro-label truncate">{signal.label}</p>
                <p className="text-text-secondary mt-0.5 truncate text-xs">
                    {signal.caption}
                </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
                <span className="text-text text-xs font-semibold tabular-nums">
                    {signal.value}
                </span>
                <ReportDelta change={signal.change} trend={signal.trend} />
            </div>
        </li>
    );
}

export function ReportSignalList({ signals }: ReportSignalListProps) {
    return (
        <ul className="divide-border divide-y">
            {signals.map((signal) => (
                <SignalRow key={signal.label} signal={signal} />
            ))}
        </ul>
    );
}

ReportSignalList.displayName = "ReportSignalList";
