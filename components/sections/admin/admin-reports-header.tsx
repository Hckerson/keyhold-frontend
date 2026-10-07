import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterPills } from "@/components/patterns/filter-pills";
import { PortalHeader } from "@/components/patterns/portal-header";
import { REPORT_EXPORT_COPY, REPORT_WINDOWS } from "@/lib/config/report-export";
import type { TimeFilter } from "@/lib/enums/enums";

const TITLE = "Platform Reports";
const LEDE =
    "What the marketplace produced month by month, where it produced it, and who it serves";

export interface AdminReportsHeaderProps {
    span: string;
    period: TimeFilter;
    onPeriodChange: (next: TimeFilter) => void;
    onExport: () => void;
}

export function AdminReportsHeader({
    span,
    period,
    onPeriodChange,
    onExport,
}: AdminReportsHeaderProps) {
    return (
        <PortalHeader
            title={TITLE}
            lede={LEDE}
            summary={span}
            action={
                <>
                    <FilterPills
                        filters={REPORT_WINDOWS}
                        active={period}
                        onChange={onPeriodChange}
                    />
                    <Button
                        type="button"
                        emphasis="solid"
                        tone="accent"
                        onClick={onExport}
                    >
                        <Download
                            size={12}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        {REPORT_EXPORT_COPY.trigger}
                    </Button>
                </>
            }
        />
    );
}

AdminReportsHeader.displayName = "AdminReportsHeader";
