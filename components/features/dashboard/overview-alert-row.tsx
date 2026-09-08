import { StatusDot } from "@/components/patterns/status-dot";
import { AlertTypeGlyph } from "@/components/features/dashboard/alert-type-glyph";
import type { Alert } from "@/lib/types";
import { formatAge, formatCompactUsd } from "@/lib/utils";

const NO_VALUE = "—";

export interface OverviewAlertRowProps {
    alert: Alert;
}

export function OverviewAlertRow({ alert }: OverviewAlertRowProps) {
    return (
        <li className="flex h-9 items-center gap-2">
            <StatusDot tone={alert.read ? "neutral" : "warning"} />
            <AlertTypeGlyph type={alert.type} />
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {alert.address}
            </span>
            <span className="text-text-secondary w-16 shrink-0 text-right text-xs tabular-nums">
                {alert.price === null
                    ? NO_VALUE
                    : formatCompactUsd(alert.price)}
            </span>
            <span className="micro-label w-10 shrink-0 text-right">
                {formatAge(alert.minutesAgo)}
            </span>
        </li>
    );
}

OverviewAlertRow.displayName = "OverviewAlertRow";
