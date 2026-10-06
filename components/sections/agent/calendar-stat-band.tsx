import { StatBand } from "@/components/patterns/stat-band";
import { calendarLoadStats } from "@/lib/data/agent-calendar-stats";
import type { Appointment } from "@/lib/types";

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
