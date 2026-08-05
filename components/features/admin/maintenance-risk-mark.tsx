import { MAINTENANCE_RISKS } from "@/lib/config/settings-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { MaintenanceRisk } from "@/lib/types";

export interface MaintenanceRiskMarkProps {
    risk: MaintenanceRisk;
    className?: string;
}

export function MaintenanceRiskMark({
    risk,
    className,
}: MaintenanceRiskMarkProps) {
    const { icon: Icon, label, tone } = MAINTENANCE_RISKS[risk];

    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase",
                chartToneSoft[tone],
                className,
            )}
        >
            <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            {label}
        </span>
    );
}

MaintenanceRiskMark.displayName = "MaintenanceRiskMark";
