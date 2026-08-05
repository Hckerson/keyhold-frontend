import { Button } from "@/components/ui/button";

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
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {REPORTS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {REPORTS_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{period}</p>
                <div className="flex items-center gap-2">
                    <Button type="button" variant="secondary" size="sm">
                        {DOWNLOAD_ACTION}
                    </Button>
                    <Button type="button" variant="primary" size="sm">
                        {CUSTOM_ACTION}
                    </Button>
                </div>
            </div>
        </header>
    );
}

AdminReportsHeader.displayName = "AdminReportsHeader";
