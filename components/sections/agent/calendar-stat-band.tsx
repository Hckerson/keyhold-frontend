import { CalendarLoadCell } from "@/components/features/agent/calendar-load-cell";
import { calendarLoadStats, type Appointment } from "@/lib/data/agent-calendar";

const BAND_LABEL = "Week at a glance";

export interface CalendarStatBandProps {
    appointments: Appointment[];
}

export function CalendarStatBand({ appointments }: CalendarStatBandProps) {
    return (
        <section
            aria-label={BAND_LABEL}
            className="border-border-light bg-background-muted divide-border grid grid-cols-2 divide-x divide-y overflow-hidden rounded-lg border shadow-sm sm:flex sm:h-14 sm:divide-y-0"
        >
            {calendarLoadStats(appointments).map((stat) => (
                <CalendarLoadCell key={stat.id} stat={stat} />
            ))}
        </section>
    );
}

CalendarStatBand.displayName = "CalendarStatBand";
