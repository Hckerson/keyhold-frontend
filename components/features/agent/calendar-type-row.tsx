import { ProgressBar } from "@/components/ui/progress-bar";
import { AppointmentTypeGlyph } from "@/components/features/agent/appointment-type-glyph";
import { APPOINTMENT_TYPES } from "@/lib/config/appointment-tones";
import type { AppointmentTypeShare } from "@/lib/data/agent-calendar";

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
            <ProgressBar
                value={share.share}
                tone={APPOINTMENT_TYPES[share.type].tone}
                className="w-12 shrink-0"
            />
            <span className="text-text w-4 shrink-0 text-right text-xs font-semibold tabular-nums">
                {share.count}
            </span>
        </li>
    );
}

CalendarTypeRow.displayName = "CalendarTypeRow";
