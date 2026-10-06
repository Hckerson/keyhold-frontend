import { AppointmentTypeGlyph } from "@/components/features/agent/appointment-type-glyph";
import { APPOINTMENT_TYPES } from "@/lib/config/appointment-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import type { AppointmentTypeShare } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface CalendarTypeRowProps {
    share: AppointmentTypeShare;
}

export function CalendarTypeRow({ share }: CalendarTypeRowProps) {
    return (
        <li className="flex h-9 items-center gap-2">
            <AppointmentTypeGlyph type={share.type} />
            <span className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                {share.label}
            </span>
            <span
                className={cn(
                    "w-4 shrink-0 text-right text-xs font-semibold tabular-nums",
                    chartToneText[APPOINTMENT_TYPES[share.type].tone],
                )}
            >
                {share.count}
            </span>
        </li>
    );
}

CalendarTypeRow.displayName = "CalendarTypeRow";
