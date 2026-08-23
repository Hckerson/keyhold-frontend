import { PortalHeader } from "@/components/patterns/portal-header";
import { PanelLink } from "@/components/features/shared/panel-link";

const CALENDAR_TITLE = "Calendar";
const CALENDAR_LEDE = "Viewings across your week, by day and by format";

export interface CalendarHeaderProps {
    summary: string;
}

export function CalendarHeader({ summary }: CalendarHeaderProps) {
    return (
        <PortalHeader
            title={CALENDAR_TITLE}
            lede={CALENDAR_LEDE}
            summary={summary}
            action={<PanelLink href="/agent/leads" label="Lead desk" />}
        />
    );
}

CalendarHeader.displayName = "CalendarHeader";
