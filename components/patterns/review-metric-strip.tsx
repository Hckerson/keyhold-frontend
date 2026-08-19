import type { ReactNode } from "react";

export interface ReviewMetricStripProps {
    children: ReactNode;
}

export function ReviewMetricStrip({ children }: ReviewMetricStripProps) {
    return (
        <div className="grid-orphan-fill bg-background border-border-light grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-5">
            {children}
        </div>
    );
}

ReviewMetricStrip.displayName = "ReviewMetricStrip";
