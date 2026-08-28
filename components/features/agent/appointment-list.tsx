import { AppointmentRow } from "@/components/features/agent/appointment-row";
import type { Appointment } from "@/lib/data/agent-calendar";

export interface AppointmentListProps {
    appointments: Appointment[];
    onReschedule: (id: string) => void;
}

export function AppointmentList({
    appointments,
    onReschedule,
}: AppointmentListProps) {
    return (
        <ul className="divide-border -mx-3 divide-y">
            {appointments.map((appointment) => (
                <AppointmentRow
                    key={appointment.id}
                    appointment={appointment}
                    onReschedule={onReschedule}
                />
            ))}
        </ul>
    );
}

AppointmentList.displayName = "AppointmentList";
