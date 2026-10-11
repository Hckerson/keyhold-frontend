import type { Signal } from "@/lib/types";

export interface SignalGridProps {
    signals: Signal[];
}

export function SignalGrid({ signals }: SignalGridProps) {
    return (
        <dl className="metric-strip border-border-light gap-x-3 gap-y-2.5 rounded-lg border px-3 py-2.5">
            {signals.map((signal) => (
                <div key={signal.label} className="min-w-0">
                    <dt className="micro-label truncate">{signal.label}</dt>
                    <dd className="text-text mt-0.5 truncate text-xs font-semibold tabular-nums">
                        {signal.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

SignalGrid.displayName = "SignalGrid";
