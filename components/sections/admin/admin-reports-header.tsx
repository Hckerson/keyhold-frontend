import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const REPORTS_TITLE = "Analytics & Reports";
const REPORTS_LEDE =
    "What the marketplace produced, where it produced it, and which way each measure is moving";
const DOWNLOAD_ACTION = "Download";
const CUSTOM_ACTION = "Generate Custom";

export interface AdminReportsHeaderProps {
    period: string;
    onDownload: () => void;
    onCustomise: () => void;
}

export function AdminReportsHeader({
    period,
    onDownload,
    onCustomise,
}: AdminReportsHeaderProps) {
    return (
        <PortalHeader
            title={REPORTS_TITLE}
            lede={REPORTS_LEDE}
            summary={period}
            action={
                <>
                    <Button type="button" size="sm" onClick={onDownload}>
                        {DOWNLOAD_ACTION}
                    </Button>
                    <Button
                        type="button"
                        emphasis="solid"
                        tone="accent"
                        size="sm"
                        onClick={onCustomise}
                    >
                        {CUSTOM_ACTION}
                    </Button>
                </>
            }
        />
    );
}

AdminReportsHeader.displayName = "AdminReportsHeader";
