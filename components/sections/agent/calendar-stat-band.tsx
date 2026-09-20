import { StatBand } from "@/components/patterns/stat-band";
import { calendarLoadStats, type Appointment } from "@/lib/data/agent-calendar";

const BAND_LABEL = "Week at a glance";

export interface CalendarStatBandProps {
    appointments: Appointment[];
    pending?: boolean;
}

export function CalendarStatBand({
    appointments,
    pending,
}: CalendarStatBandProps) {
    return (
        <StatBand
            label={BAND_LABEL}
            stats={calendarLoadStats(appointments)}
            pending={pending}
        />
    );
}

CalendarStatBand.displayName = "CalendarStatBand";
