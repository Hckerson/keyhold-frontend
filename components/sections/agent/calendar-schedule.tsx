"use client";

import { CalendarX2 } from "lucide-react";
import { PanelLink } from "@/components/features/shared/panel-link";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterPills } from "@/components/patterns/filter-pills";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { CalendarNextCard } from "@/components/features/agent/calendar-next-card";
import { AppointmentList } from "@/components/features/agent/appointment-list";
import { AppointmentDayGroup } from "@/components/features/agent/appointment-day-group";
import { cn } from "@/lib/utils";
import { SCHEDULE_ACTION, VIEW_MODES } from "@/lib/config/agent-calendar";
import { formatDay, groupAppointmentsByDate } from "@/lib/data/agent-calendar";
import type { Appointment, CalendarViewMode } from "@/lib/types";

const DAY_TITLE = "Schedule";
const WEEK_TITLE = "Week Schedule";
const EMPTY_TITLE = "Nothing scheduled";
const REMAINDER_TITLE = "Nothing else scheduled";

export interface CalendarScheduleProps {
    view: CalendarViewMode;
    appointments: Appointment[];
    selectedIso: string;
    rangeLabel: string;
    dayCount: number;
    weekCount: number;
    onViewChange: (view: CalendarViewMode) => void;
    onReschedule: (id: string) => void;
    pending?: boolean;
    className?: string;
}

export function CalendarSchedule({
    view,
    appointments,
    selectedIso,
    rangeLabel,
    dayCount,
    weekCount,
    onViewChange,
    onReschedule,
    pending,
    className,
}: CalendarScheduleProps) {
    const isDayView = view === "month";
    const next = appointments.at(0);
    const rest = appointments.slice(1);

    const emptyDescription = isDayView
        ? `No appointments on ${formatDay(selectedIso)}.`
        : "No appointments this week.";

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            {next && <CalendarNextCard appointment={next} />}

            <Panel
                title={isDayView ? DAY_TITLE : WEEK_TITLE}
                description={isDayView ? formatDay(selectedIso) : rangeLabel}
                count={appointments.length}
                action={
                    <FilterPills
                        filters={VIEW_MODES}
                        active={view}
                        onChange={onViewChange}
                        counts={{ month: dayCount, week: weekCount }}
                    />
                }
            >
                <PresenceSwap
                    swapKey={`${view}-${selectedIso}-${rest.length > 0 ? "list" : pending ? "pending" : "empty"}`}
                >
                    {rest.length > 0 ? (
                        <PanelInset>
                            {isDayView ? (
                                <AppointmentList
                                    appointments={rest}
                                    onReschedule={onReschedule}
                                />
                            ) : (
                                <div className="flex flex-col gap-2 py-1">
                                    {groupAppointmentsByDate(rest).map(
                                        (group) => (
                                            <AppointmentDayGroup
                                                key={group.date}
                                                group={group}
                                                onReschedule={onReschedule}
                                            />
                                        ),
                                    )}
                                </div>
                            )}
                        </PanelInset>
                    ) : pending ? (
                        <SkeletonRows />
                    ) : (
                        <EmptyState
                            icon={CalendarX2}
                            title={next ? REMAINDER_TITLE : EMPTY_TITLE}
                            description={next ? undefined : emptyDescription}
                            action={
                                <PanelLink
                                    href="/agent/leads"
                                    label={SCHEDULE_ACTION}
                                />
                            }
                        />
                    )}
                </PresenceSwap>
            </Panel>
        </div>
    );
}

CalendarSchedule.displayName = "CalendarSchedule";
