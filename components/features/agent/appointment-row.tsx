import { Pencil } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { StatusDot } from "@/components/patterns/status-dot";
import { ProgressBar } from "@/components/ui/progress-bar";
import { AppointmentTypeGlyph } from "@/components/features/agent/appointment-type-glyph";
import { APPOINTMENT_STATUSES } from "@/lib/config/appointment-tones";
import {
    durationShare,
    formatDuration,
    formatTime,
    type Appointment,
} from "@/lib/data/agent-calendar";

export interface AppointmentRowProps {
    appointment: Appointment;
    onReschedule: (id: string) => void;
}

export function AppointmentRow({
    appointment,
    onReschedule,
}: AppointmentRowProps) {
    const status = APPOINTMENT_STATUSES[appointment.status];

    return (
        <li className="hover:bg-background-muted ease-smooth flex h-9 items-center gap-2 px-3 transition-colors">
            <span className="text-text w-14 shrink-0 text-xs font-semibold tabular-nums">
                {formatTime(appointment.start)}
            </span>

            <AppointmentTypeGlyph type={appointment.type} />

            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {appointment.title}
            </span>

            <span className="reading-only text-text-secondary w-28 shrink-0 truncate text-xs">
                {appointment.property}
            </span>

            <span className="desk-only text-text-secondary w-24 shrink-0 truncate text-xs">
                {appointment.client}
            </span>

            <ProgressBar
                value={durationShare(appointment.durationMinutes)}
                className="wide-only w-10 shrink-0"
            />

            <span className="micro-label w-12 shrink-0 text-right">
                {formatDuration(appointment.durationMinutes)}
            </span>

            <span className="flex w-20 shrink-0 items-center justify-end gap-1.5">
                <StatusDot tone={status.tone} />
                <span className="micro-label">{status.label}</span>
            </span>

            <button
                type="button"
                onClick={() => onReschedule(appointment.id)}
                aria-label={`Reschedule ${appointment.title}`}
                className="text-text-muted hover:text-accent hover:bg-background-alt focus-visible:ring-accent ease-smooth grid size-5 shrink-0 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <Pencil className="size-3" strokeWidth={1.5} />
            </button>
        </li>
    );
}

AppointmentRow.displayName = "AppointmentRow";
