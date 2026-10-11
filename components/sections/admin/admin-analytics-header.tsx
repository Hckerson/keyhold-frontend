import { FilterPills } from "@/components/patterns/filter-pills";
import { PortalHeader } from "@/components/patterns/portal-header";
import { ANALYTICS_WINDOWS } from "@/lib/config/admin-analytics";
import type { TimeFilter } from "@/lib/enums/enums";

const TITLE = "Analytics";
const LEDE =
    "How the marketplace is moving, and where money and work are sitting right now";

export interface AdminAnalyticsHeaderProps {
    span: string;
    range: TimeFilter;
    onRangeChange: (next: TimeFilter) => void;
}

export function AdminAnalyticsHeader({
    span,
    range,
    onRangeChange,
}: AdminAnalyticsHeaderProps) {
    return (
        <PortalHeader
            title={TITLE}
            lede={LEDE}
            summary={span}
            action={
                <FilterPills
                    filters={ANALYTICS_WINDOWS}
                    active={range}
                    onChange={onRangeChange}
                />
            }
        />
    );
}

AdminAnalyticsHeader.displayName = "AdminAnalyticsHeader";
