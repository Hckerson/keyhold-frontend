import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { AppointmentTypeGlyph } from "@/components/features/agent/appointment-type-glyph";
import { cn, initialsOf } from "@/lib/utils";
import { chartToneText } from "@/lib/config/chart-tones";
import {
    APPOINTMENT_STATUSES,
    APPOINTMENT_TYPES,
} from "@/lib/config/appointment-tones";
import {
    formatDuration,
    formatGroupDay,
    formatTime,
} from "@/lib/data/agent-calendar";
import type { Appointment } from "@/lib/types";

const NEXT_LABEL = "Next up";

export interface CalendarNextCardProps {
    appointment: Appointment;
}

export function CalendarNextCard({ appointment }: CalendarNextCardProps) {
    const status = APPOINTMENT_STATUSES[appointment.status];
    const type = APPOINTMENT_TYPES[appointment.type];

    return (
        <article className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label">
                        {NEXT_LABEL} · {formatGroupDay(appointment.date)}
                    </p>
                    <p className="text-h4 font-display text-text mt-1 font-light tabular-nums">
                        {formatTime(appointment.start)}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5">
                        <AppointmentTypeGlyph type={appointment.type} />
                        <span className="text-text truncate text-xs font-semibold">
                            {appointment.title}
                        </span>
                        <span className="text-text-secondary truncate text-xs">
                            · {appointment.property}
                        </span>
                    </p>
                </div>
                <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
            </div>

            <div className="bg-background-muted border-border-light mt-3 flex items-center gap-3 rounded-md border p-2">
                <Avatar
                    size="sm"
                    initials={initialsOf(appointment.client)}
                    className="shrink-0"
                />
                <div className="min-w-0 flex-1">
                    <p className="text-text truncate text-xs font-medium">
                        {appointment.client}
                    </p>
                    <p className="text-text-muted line-clamp-2 text-xs">
                        {appointment.notes}
                    </p>
                </div>
                <div className="flex w-20 shrink-0 flex-col items-end gap-1">
                    <span className="micro-label">{type.label}</span>
                    <span
                        className={cn(
                            "text-xs font-medium tabular-nums",
                            chartToneText[type.tone],
                        )}
                    >
                        {formatDuration(appointment.durationMinutes)}
                    </span>
                </div>
            </div>
        </article>
    );
}

CalendarNextCard.displayName = "CalendarNextCard";
