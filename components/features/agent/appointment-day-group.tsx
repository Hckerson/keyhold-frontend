import { AppointmentList } from "@/components/features/agent/appointment-list";
import {
    formatGroupDay,
    formatHours,
    type AppointmentGroup,
} from "@/lib/data/agent-calendar";

export interface AppointmentDayGroupProps {
    group: AppointmentGroup;
    onReschedule: (id: string) => void;
}

export function AppointmentDayGroup({
    group,
    onReschedule,
}: AppointmentDayGroupProps) {
    const booked = group.items.reduce(
        (total, item) => total + item.durationMinutes,
        0,
    );

    return (
        <div>
            <div className="border-border-light -mx-3 flex h-7 items-center justify-between gap-2 border-b px-3">
                <span className="micro-label">
                    {formatGroupDay(group.date)}
                </span>
                <span className="micro-label tabular-nums">
                    {group.items.length} · {formatHours(booked)}
                </span>
            </div>
            <AppointmentList
                appointments={group.items}
                onReschedule={onReschedule}
            />
        </div>
    );
}

AppointmentDayGroup.displayName = "AppointmentDayGroup";
