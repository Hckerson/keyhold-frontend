"use client";

import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { CalendarMonthNav } from "@/components/features/shared/calendar-month-nav";
import {
    MiniCalendar,
    monthLabel,
    shiftMonth,
} from "@/components/features/shared/mini-calendar";
import { CalendarTypeMix } from "@/components/features/agent/calendar-type-mix";
import { cn } from "@/lib/utils";
import type { AppointmentTypeShare } from "@/lib/data/agent-calendar";

const MIX_TITLE = "Appointment Mix";

export interface CalendarRailProps {
    year: number;
    month: number;
    selected: number;
    marked: number[];
    today?: number;
    shares: AppointmentTypeShare[];
    rangeLabel: string;
    onSelect: (day: number) => void;
    onMonthChange: (year: number, month: number) => void;
    className?: string;
}

export function CalendarRail({
    year,
    month,
    selected,
    marked,
    today,
    shares,
    rangeLabel,
    onSelect,
    onMonthChange,
    className,
}: CalendarRailProps) {
    const total = shares.reduce((sum, share) => sum + share.count, 0);

    const handleShift = (delta: number) => {
        const next = shiftMonth(year, month, delta);
        onMonthChange(next.year, next.month);
    };

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            <Panel
                title={monthLabel(year, month)}
                action={<CalendarMonthNav onShift={handleShift} />}
            >
                <MiniCalendar
                    className="mt-3"
                    year={year}
                    month={month}
                    selected={selected}
                    onSelect={onSelect}
                    marked={marked}
                    today={today}
                />
            </Panel>

            <Panel title={MIX_TITLE} description={rangeLabel} count={total}>
                <PanelInset>
                    <CalendarTypeMix shares={shares} />
                </PanelInset>
            </Panel>
        </div>
    );
}

CalendarRail.displayName = "CalendarRail";
