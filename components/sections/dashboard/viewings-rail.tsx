"use client";

import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { MiniCalendar } from "@/components/features/shared/mini-calendar";
import { TODAY } from "@/lib/data/viewings";

const CALENDAR_TITLE = "Calendar";
const CALENDAR_LEDE = "Pick a day to narrow the schedule";
const CALENDAR_LEGEND = "Dates carrying a scheduled viewing";

export interface ViewingsRailProps {
    year: number;
    month: number;
    selectedDay: number | null;
    markedDays: number[];
    onSelectDay: (day: number) => void;
    onMonthChange: (year: number, month: number) => void;
}

export function ViewingsRail({
    year,
    month,
    selectedDay,
    markedDays,
    onSelectDay,
    onMonthChange,
}: ViewingsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel title={CALENDAR_TITLE} description={CALENDAR_LEDE}>
                <MiniCalendar
                    year={year}
                    month={month}
                    selected={selectedDay ?? 0}
                    onSelect={onSelectDay}
                    onMonthChange={onMonthChange}
                    marked={markedDays}
                    today={
                        year === TODAY.year && month === TODAY.month
                            ? TODAY.day
                            : undefined
                    }
                />
                <PanelInset>
                    <p className="text-text-muted flex h-9 items-center gap-2 text-xs">
                        <span className="bg-accent size-1.5 shrink-0 rounded-full" />
                        {CALENDAR_LEGEND}
                    </p>
                </PanelInset>
            </Panel>
        </div>
    );
}

ViewingsRail.displayName = "ViewingsRail";
