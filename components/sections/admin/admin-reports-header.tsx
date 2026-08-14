import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const REPORTS_TITLE = "Analytics & Reports";
const REPORTS_LEDE =
    "What the marketplace produced, where it produced it, and which way each measure is moving";
const DOWNLOAD_ACTION = "Download";
const CUSTOM_ACTION = "Generate Custom";

export interface AdminReportsHeaderProps {
    period: string;
}

export function AdminReportsHeader({ period }: AdminReportsHeaderProps) {
    return (
        <PortalHeader
            title={REPORTS_TITLE}
            lede={REPORTS_LEDE}
            summary={period}
            action={
                <>
                    <Button type="button" variant="secondary" size="sm">
                        {DOWNLOAD_ACTION}
                    </Button>
                    <Button type="button" variant="primary" size="sm">
                        {CUSTOM_ACTION}
                    </Button>
                </>
            }
        />
    );
}

AdminReportsHeader.displayName = "AdminReportsHeader";
