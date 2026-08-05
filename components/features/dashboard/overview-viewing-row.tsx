import { Avatar } from "@/components/ui/avatar";
import {
    StatusBadge,
    type StatusBadgeProps,
} from "@/components/ui/status-badge";
import { StatusDot, type DotTone } from "@/components/patterns/status-dot";
import { initialsOf } from "@/lib/utils";
import type {
    OverviewViewing,
    ViewingTiming,
} from "@/lib/data/dashboard-overview";
import type { ViewingStatus } from "@/lib/types";

const timingTone: Record<ViewingTiming, DotTone> = {
    today: "warning",
    tomorrow: "info",
    later: "neutral",
};

const statusTone: Record<ViewingStatus, StatusBadgeProps["tone"]> = {
    confirmed: "success",
    pending: "warning",
    cancelled: "neutral",
};

export interface OverviewViewingRowProps {
    viewing: OverviewViewing;
}

export function OverviewViewingRow({ viewing }: OverviewViewingRowProps) {
    return (
        <li className="flex h-11 items-center gap-2">
            <StatusDot tone={timingTone[viewing.timing]} />
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {viewing.address}
            </span>
            <Avatar
                size="xs"
                tone="accent"
                elevated={false}
                initials={initialsOf(viewing.agent)}
                className="text-[10px]"
            />
            <span className="text-text-secondary w-24 shrink-0 truncate text-xs">
                {viewing.agent}
            </span>
            <StatusBadge
                tone={statusTone[viewing.status]}
                className="capitalize"
            >
                {viewing.status}
            </StatusBadge>
            <span className="micro-label w-14 shrink-0 text-right">
                {viewing.when}
            </span>
        </li>
    );
}

OverviewViewingRow.displayName = "OverviewViewingRow";
