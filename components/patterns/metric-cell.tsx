import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MetricCellProps {
    label: string;
    children: ReactNode;
    className?: string;
}

export function MetricCell({ label, children, className }: MetricCellProps) {
    return (
        <div className={cn("min-w-0", className)}>
            <p className="micro-label truncate">{label}</p>
            <div className="text-text mt-1 flex min-h-4 items-center text-xs font-medium">
                {children}
            </div>
        </div>
    );
}

MetricCell.displayName = "MetricCell";
