import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { SCHEDULE_ACTION } from "@/lib/data/agent-calendar";

const CALENDAR_TITLE = "Calendar";
const CALENDAR_LEDE = "Showings, inspections and closings across your week";

export interface CalendarHeaderProps {
    summary: string;
}

export function CalendarHeader({ summary }: CalendarHeaderProps) {
    return (
        <PortalHeader
            title={CALENDAR_TITLE}
            lede={CALENDAR_LEDE}
            summary={summary}
            action={
                <Button type="button" variant="primary" size="sm">
                    {SCHEDULE_ACTION}
                </Button>
            }
        />
    );
}

CalendarHeader.displayName = "CalendarHeader";
