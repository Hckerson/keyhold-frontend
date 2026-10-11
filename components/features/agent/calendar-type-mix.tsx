import { CalendarTypeRow } from "@/components/features/agent/calendar-type-row";
import type { AppointmentTypeShare } from "@/lib/types";

export interface CalendarTypeMixProps {
    shares: AppointmentTypeShare[];
}

export function CalendarTypeMix({ shares }: CalendarTypeMixProps) {
    return (
        <ul className="divide-border divide-y">
            {shares.map((share) => (
                <CalendarTypeRow key={share.type} share={share} />
            ))}
        </ul>
    );
}

CalendarTypeMix.displayName = "CalendarTypeMix";
