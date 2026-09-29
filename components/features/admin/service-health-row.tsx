import { ErrorBudgetMeter } from "@/components/features/admin/error-budget-meter";
import { StatusDot } from "@/components/patterns/status-dot";
import { errorRateTone, SERVICE_STATES } from "@/lib/config/admin-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ServiceHealth } from "@/lib/types";

const LATENCY_SUFFIX = "ms";

export interface ServiceHealthRowProps {
    service: ServiceHealth;
}

export function ServiceHealthRow({ service }: ServiceHealthRowProps) {
    const state = SERVICE_STATES[service.state];

    return (
        <tr className="ease-smooth hover:bg-background-muted h-9 transition-colors">
            <th scope="row" className="py-0 text-left font-normal">
                <span
                    title={state.label}
                    className="flex min-w-0 items-center gap-2"
                >
                    <StatusDot tone={state.tone} />
                    <span className="text-text truncate text-xs font-medium">
                        {service.label}
                    </span>
                    <span className="sr-only">{state.label}</span>
                </span>
            </th>
            <td className="py-0 pl-3">
                <ErrorBudgetMeter
                    uptime={service.uptime}
                    label={service.label}
                />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {service.latencyP95}
                {LATENCY_SUFFIX}
            </td>
            <td
                className={cn(
                    "py-0 pl-3 text-right text-xs font-medium tabular-nums",
                    chartToneText[errorRateTone(service.errorRate)],
                )}
            >
                {service.errorRate}%
            </td>
        </tr>
    );
}

ServiceHealthRow.displayName = "ServiceHealthRow";
