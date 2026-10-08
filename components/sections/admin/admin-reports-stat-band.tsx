import { ReportMeasureCell } from "@/components/features/admin/report-measure-cell";
import type { ReportMeasure } from "@/lib/types";

const BAND_LABEL = "Totals for the window, with the last complete month";

export interface AdminReportsStatBandProps {
    measures: ReportMeasure[];
    pending?: boolean;
}

export function AdminReportsStatBand({
    measures,
    pending,
}: AdminReportsStatBandProps) {
    return (
        <dl
            aria-label={BAND_LABEL}
            aria-busy={pending || undefined}
            className="figure-grid border-border overflow-hidden rounded-xl border shadow-sm"
        >
            {measures.map((measure) => (
                <ReportMeasureCell
                    key={measure.id}
                    measure={measure}
                    pending={pending}
                />
            ))}
        </dl>
    );
}

AdminReportsStatBand.displayName = "AdminReportsStatBand";
