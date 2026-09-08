import { LEAD_TEMPERATURES } from "@/lib/config/lead-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { leadScore, temperatureOf } from "@/lib/data/agent-leads";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/types/lead";

export interface LeadTemperatureChipProps {
    lead: Lead;
    className?: string;
}

export function LeadTemperatureChip({
    lead,
    className,
}: LeadTemperatureChipProps) {
    const band = LEAD_TEMPERATURES[temperatureOf(lead)];
    const Icon = band.icon;
    const score = leadScore(lead);

    return (
        <span
            title={`Score ${score} of 100`}
            className={cn(
                "inline-flex h-5 items-center gap-1 rounded-md px-1.5",
                chartToneSoft[band.chartTone],
                className,
            )}
        >
            <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-[10px] font-medium tracking-wide uppercase">
                {band.label}
            </span>
            <span className="text-[10px] font-medium tabular-nums opacity-70">
                {score}
            </span>
        </span>
    );
}

LeadTemperatureChip.displayName = "LeadTemperatureChip";
