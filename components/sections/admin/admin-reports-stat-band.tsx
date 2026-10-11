import { ReportMeasureCell } from "@/components/features/admin/report-measure-cell";
import { REPORT_GRAINS } from "@/lib/config/report-export";
import type { ReportGrain, ReportMeasure } from "@/lib/types";

export interface AdminReportsStatBandProps {
    measures: ReportMeasure[];
    grain: ReportGrain;
    pending?: boolean;
}

export function AdminReportsStatBand({
    measures,
    grain,
    pending,
}: AdminReportsStatBandProps) {
    return (
        <dl
            aria-label={REPORT_GRAINS[grain].band}
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
