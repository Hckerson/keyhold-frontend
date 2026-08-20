import type { ReactNode } from "react";

export interface ReviewMetricStripProps {
    children: ReactNode;
}

export function ReviewMetricStrip({ children }: ReviewMetricStripProps) {
    return (
        <div className="metric-strip bg-background border-border-light gap-3 rounded-md border p-3">
            {children}
        </div>
    );
}

ReviewMetricStrip.displayName = "ReviewMetricStrip";
