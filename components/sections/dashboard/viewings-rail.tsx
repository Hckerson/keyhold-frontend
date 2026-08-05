"use client";

import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { MiniCalendar } from "@/components/features/shared/mini-calendar";
import { TODAY, statusShares, timingShares } from "@/lib/data/viewings";
import type { Viewing } from "@/lib/types";

const CALENDAR_TITLE = "Calendar";
const CALENDAR_LEDE = "Pick a day to narrow the schedule";
const CALENDAR_LEGEND = "Dates carrying a scheduled viewing";
const STATUS_TITLE = "Status Mix";
const STATUS_LEDE = "Where every tour on the book currently stands";
const CADENCE_TITLE = "Cadence";
const CADENCE_LEDE = "How the schedule spreads across the days ahead";

export interface ViewingsRailProps {
    viewings: Viewing[];
    year: number;
    month: number;
    selectedDay: number | null;
    markedDays: number[];
    onSelectDay: (day: number) => void;
    onMonthChange: (year: number, month: number) => void;
}

export function ViewingsRail({
    viewings,
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
                    className="pt-3"
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

            <Panel
                title={STATUS_TITLE}
                description={STATUS_LEDE}
                count={viewings.length}
            >
                <PanelInset>
                    <ShareList shares={statusShares(viewings)} />
                </PanelInset>
            </Panel>

            <Panel title={CADENCE_TITLE} description={CADENCE_LEDE}>
                <PanelInset>
                    <ShareList shares={timingShares(viewings)} />
                </PanelInset>
            </Panel>
        </div>
    );
}

ViewingsRail.displayName = "ViewingsRail";
