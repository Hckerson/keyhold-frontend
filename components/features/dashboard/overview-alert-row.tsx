import { FileText, Home, TrendingDown, type LucideIcon } from "lucide-react";
import { DeltaChip } from "@/components/ui/delta-chip";
import { chartToneSoft, type ChartTone } from "@/lib/config/chart-tones";
import {
    alertKindLabel,
    type AlertKind,
    type MatchAlert,
} from "@/lib/data/dashboard-overview";
import { cn, formatCompactUsd, formatMillions } from "@/lib/utils";

const kindIcon: Record<AlertKind, LucideIcon> = {
    "price-drop": TrendingDown,
    "new-match": Home,
    "under-offer": FileText,
};

const kindTone: Record<AlertKind, ChartTone> = {
    "price-drop": "success",
    "new-match": "info",
    "under-offer": "warning",
};

export interface OverviewAlertRowProps {
    alert: MatchAlert;
}

export function OverviewAlertRow({ alert }: OverviewAlertRowProps) {
    const Icon = kindIcon[alert.kind];

    return (
        <li className="flex h-9 items-center gap-2">
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full",
                    chartToneSoft[kindTone[alert.kind]],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {alert.address}
            </span>
            <span className="text-text-secondary shrink-0 text-xs tabular-nums">
                {formatMillions(alert.price)}
            </span>
            {alert.change === undefined ? (
                <span className="micro-label shrink-0">
                    {alertKindLabel[alert.kind]}
                </span>
            ) : (
                <DeltaChip
                    value={formatCompactUsd(alert.change)}
                    direction="down"
                    tone="success"
                    size="sm"
                />
            )}
            <span className="micro-label w-6 shrink-0 text-right">
                {alert.when}
            </span>
        </li>
    );
}

OverviewAlertRow.displayName = "OverviewAlertRow";
