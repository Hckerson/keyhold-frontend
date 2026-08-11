import { StatBand } from "@/components/patterns/stat-band";
import { calendarLoadStats, type Appointment } from "@/lib/data/agent-calendar";

const BAND_LABEL = "Week at a glance";

export interface CalendarStatBandProps {
    appointments: Appointment[];
}

export function CalendarStatBand({ appointments }: CalendarStatBandProps) {
    return (
        <StatBand label={BAND_LABEL} stats={calendarLoadStats(appointments)} />
    );
}

CalendarStatBand.displayName = "CalendarStatBand";
