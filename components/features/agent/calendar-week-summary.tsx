"use client";

import { useMemo } from "react";
import { Panel } from "@/components/ui/panel";
import { APPOINTMENT_TYPES } from "@/components/features/agent/appointment-row";
import {
    APPOINTMENT_TYPE_KEYS,
    appointmentsInRange,
    shortDate,
} from "@/lib/data/agent-calendar";
import { cn } from "@/lib/utils";

export interface CalendarWeekSummaryProps {
    start: Date;
    end: Date;
}

export function CalendarWeekSummary({ start, end }: CalendarWeekSummaryProps) {
    const weekCounts = useMemo(() => {
        const inWeek = appointmentsInRange(start, end);
        return APPOINTMENT_TYPE_KEYS.map((type) => ({
            type,
            label: APPOINTMENT_TYPES[type].label,
            count: inWeek.filter((item) => item.type === type).length,
        }));
    }, [start, end]);

    return (
        <Panel
            title="This Week"
            description={`${shortDate(start)} – ${shortDate(end)}`}
        >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {weekCounts.map((metric) => (
                    <div key={metric.type}>
                        <p className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                            {metric.label}
                        </p>
                        <p
                            className={cn(
                                "mt-1 text-xs font-medium tabular-nums",
                                metric.type === "closing"
                                    ? "text-accent"
                                    : "text-text",
                            )}
                        >
                            {metric.count}
                        </p>
                    </div>
                ))}
            </div>
        </Panel>
    );
}

CalendarWeekSummary.displayName = "CalendarWeekSummary";
