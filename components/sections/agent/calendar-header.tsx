import { Button } from "@/components/ui/button";

const CALENDAR_TITLE = "Calendar";
const CALENDAR_LEDE = "Showings, inspections and closings across your week";
const SCHEDULE_ACTION = "Schedule Appointment";

export interface CalendarHeaderProps {
    summary: string;
}

export function CalendarHeader({ summary }: CalendarHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {CALENDAR_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {CALENDAR_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Button variant="primary" size="sm">
                    {SCHEDULE_ACTION}
                </Button>
            </div>
        </header>
    );
}

CalendarHeader.displayName = "CalendarHeader";
