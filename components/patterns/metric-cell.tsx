import type { ReactNode } from "react";

export interface MetricCellProps {
    label: string;
    children: ReactNode;
}

export function MetricCell({ label, children }: MetricCellProps) {
    return (
        <div className="min-w-0">
            <p className="micro-label truncate">{label}</p>
            <div className="text-text mt-1 flex h-4 items-center text-xs font-medium">
                {children}
            </div>
        </div>
    );
}

MetricCell.displayName = "MetricCell";
