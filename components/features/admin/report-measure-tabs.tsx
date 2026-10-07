"use client";

import { useId, type KeyboardEvent } from "react";
import { ReportMeasureTab } from "@/components/features/admin/report-measure-tab";
import type { ReportMeasure, ReportMeasureId } from "@/lib/types";

const LABEL = "Measure to chart";
const STEPS: Partial<Record<string, number>> = { ArrowRight: 1, ArrowLeft: -1 };

export interface ReportMeasureTabsProps {
    measures: ReportMeasure[];
    active: ReportMeasureId;
    panelId: string;
    tabIdOf: (id: ReportMeasureId) => string;
    pending?: boolean;
    onChange: (id: ReportMeasureId) => void;
}

export function ReportMeasureTabs({
    measures,
    active,
    panelId,
    tabIdOf,
    pending,
    onChange,
}: ReportMeasureTabsProps) {
    const indicatorId = useId();

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = STEPS[event.key];
        if (!step) return;
        event.preventDefault();
        const index = measures.findIndex((measure) => measure.id === active);
        const next =
            measures[(index + step + measures.length) % measures.length];
        onChange(next.id);
        document.getElementById(tabIdOf(next.id))?.focus();
    };

    return (
        <div
            role="tablist"
            aria-label={LABEL}
            onKeyDown={onKeyDown}
            className="measure-tabs"
        >
            {measures.map((measure) => (
                <ReportMeasureTab
                    key={measure.id}
                    measure={measure}
                    active={measure.id === active}
                    tabId={tabIdOf(measure.id)}
                    panelId={panelId}
                    indicatorId={indicatorId}
                    pending={pending}
                    onSelect={() => onChange(measure.id)}
                />
            ))}
        </div>
    );
}

ReportMeasureTabs.displayName = "ReportMeasureTabs";
