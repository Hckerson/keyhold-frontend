import { chartToneSoft } from "@/lib/config/chart-tones";
import { VIEWING_MODES } from "@/lib/config/viewing-tones";
import { cn } from "@/lib/utils";
import type { ViewingMode } from "@/lib/types";

export interface ViewingModeMarkProps {
    mode: ViewingMode;
    className?: string;
}

export function ViewingModeMark({ mode, className }: ViewingModeMarkProps) {
    const { icon: Icon, label, chartTone } = VIEWING_MODES[mode];

    return (
        <span className={cn("flex min-w-0 items-center gap-2", className)}>
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[chartTone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {label}
            </span>
        </span>
    );
}

ViewingModeMark.displayName = "ViewingModeMark";
