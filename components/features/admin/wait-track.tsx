import { chartToneFill, type ChartTone } from "@/lib/config/chart-tones";
import { tickPosition, WAIT_TICKS } from "@/lib/data/admin-overview-triage";
import { cn } from "@/lib/utils";

const INNER_TICKS = WAIT_TICKS.slice(1, -1);

export interface WaitTrackProps {
    position: number;
    tone: ChartTone;
    label: string;
}

export function WaitTrack({ position, tone, label }: WaitTrackProps) {
    return (
        <div
            role="img"
            aria-label={label}
            className="bg-background-muted relative h-1.5 w-full rounded-full"
        >
            {INNER_TICKS.map((tick, index) => (
                <span
                    key={tick.minutes}
                    aria-hidden="true"
                    className="bg-border absolute -top-1 h-3.5 w-px"
                    style={{ left: `${tickPosition(index + 1)}%` }}
                />
            ))}
            {position > 0 && (
                <span
                    aria-hidden="true"
                    className={cn(
                        "ease-smooth absolute inset-y-0 left-0 rounded-full transition-all duration-300",
                        chartToneFill[tone],
                    )}
                    style={{ width: `${position}%` }}
                />
            )}
        </div>
    );
}

WaitTrack.displayName = "WaitTrack";
