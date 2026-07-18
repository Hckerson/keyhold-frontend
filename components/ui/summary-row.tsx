import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SummaryRowProps {
    label: string;
    value: ReactNode;
    className?: string;
}

export function SummaryRow({ label, value, className }: SummaryRowProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-between gap-4 text-sm",
                className,
            )}
        >
            <span className="text-text-secondary">{label}</span>
            <span className="text-text font-medium">{value}</span>
        </div>
    );
}

SummaryRow.displayName = "SummaryRow";
