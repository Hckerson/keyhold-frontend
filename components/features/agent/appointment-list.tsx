import { AppointmentRow } from "@/components/features/agent/appointment-row";
import type { Appointment } from "@/lib/data/agent-calendar";

export interface AppointmentListProps {
    appointments: Appointment[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
    return (
        <ul className="divide-border -mx-3 divide-y">
            {appointments.map((appointment) => (
                <AppointmentRow
                    key={appointment.id}
                    appointment={appointment}
                />
            ))}
        </ul>
    );
}

AppointmentList.displayName = "AppointmentList";
