import type { Appointment } from "@/lib/data/agent-calendar";
import { APPOINTMENT_TYPES } from "@/lib/config/appointment-tones";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import {
    VIEWING_MODE_BY_API,
    VIEWING_STATUS_BY_API,
} from "@/lib/utils/status-maps";

const ISO_DATE_LENGTH = 10;
const CLOCK_LENGTH = 5;

const scheduledAt = (viewing: {
    confirmedTime: string | null;
    proposedTimes: string[];
}) => viewing.confirmedTime ?? viewing.proposedTimes[0] ?? null;

const localClock = (when: Date) =>
    `${String(when.getHours()).padStart(2, "0")}:${String(
        when.getMinutes(),
    ).padStart(2, "0")}`.slice(0, CLOCK_LENGTH);

const localDate = (when: Date) =>
    `${when.getFullYear()}-${String(when.getMonth() + 1).padStart(
        2,
        "0",
    )}-${String(when.getDate()).padStart(2, "0")}`.slice(0, ISO_DATE_LENGTH);

export const toAppointments = (connection: ConnectionListItem): Appointment[] =>
    connection.viewings.flatMap((viewing) => {
        const at = scheduledAt(viewing);
        if (!at) return [];

        const when = new Date(at);
        const type = VIEWING_MODE_BY_API[viewing.mode];

        return [
            {
                id: viewing.id,
                type,
                status: VIEWING_STATUS_BY_API[viewing.status],
                title: `${APPOINTMENT_TYPES[type].label} viewing`,
                property: connection.property.address,
                client: connection.buyer.fullName,
                date: localDate(when),
                start: localClock(when),
                durationMinutes: viewing.durationMinutes,
                notes: viewing.notes ?? "",
            },
        ];
    });

export const toAppointmentBook = (
    connections: ConnectionListItem[],
): Appointment[] => connections.flatMap(toAppointments);
