"use client";

import { CalendarClock, X } from "lucide-react";
import { m } from "motion/react";
import { IconButton } from "@/components/ui/icon-button";
import { ViewingAgentMark } from "@/components/features/dashboard/viewing-agent-mark";
import { ViewingCountdown } from "@/components/features/dashboard/viewing-countdown";
import { ViewingModeMark } from "@/components/features/dashboard/viewing-mode-mark";
import { ViewingPropertyLink } from "@/components/features/dashboard/viewing-property-link";
import { ViewingStatusMark } from "@/components/features/dashboard/viewing-status-mark";
import { daysUntil, formatViewingDate, isActive } from "@/lib/data/viewings";
import type { Viewing } from "@/lib/types";
import { cn, formatMillions } from "@/lib/utils";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";

const RESCHEDULE_LABEL = "Reschedule";
const CANCEL_LABEL = "Cancel";

export interface ViewingRowProps {
    viewing: Viewing;
    cancelling: boolean;
    onReschedule: (id: string) => void;
    onCancel: (id: string) => void;
}

export function ViewingRow({
    viewing,
    cancelling,
    onReschedule,
    onCancel,
}: ViewingRowProps) {
    const days = daysUntil(viewing);
    const active = isActive(viewing);

    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className={cn(
                "ease-smooth hover:bg-background-muted h-11 transition-colors",
                !active && "opacity-60",
            )}
        >
            <td className="py-0">
                <ViewingStatusMark status={viewing.status} />
            </td>
            <td className="py-0 pl-3">
                <ViewingPropertyLink viewing={viewing} />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(viewing.price, 2)}
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {formatViewingDate(viewing.date)} · {viewing.time}
            </td>
            <td className="py-0 pl-3">
                <ViewingModeMark mode={viewing.mode} />
            </td>
            <td className="py-0 pl-3">
                <ViewingAgentMark agent={viewing.agent} />
            </td>
            <td className="py-0 pl-3 text-right">
                <ViewingCountdown days={days} />
            </td>
            <td className="py-0 pl-3">
                {active && (
                    <span className="flex items-center justify-end gap-1">
                        <IconButton
                            tone="accent"
                            icon={CalendarClock}
                            label={`${RESCHEDULE_LABEL} ${viewing.address}`}
                            onClick={() => onReschedule(viewing.id)}
                        />
                        <IconButton
                            tone="error"
                            icon={X}
                            label={`${CANCEL_LABEL} ${viewing.address}`}
                            disabled={cancelling}
                            onClick={() => onCancel(viewing.id)}
                        />
                    </span>
                )}
            </td>
        </m.tr>
    );
}

ViewingRow.displayName = "ViewingRow";
