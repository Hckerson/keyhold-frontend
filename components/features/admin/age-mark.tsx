import { ageTone } from "@/lib/config/admin-tones";
import { chartToneText, type ChartTone } from "@/lib/config/chart-tones";
import { cn, formatAge } from "@/lib/utils";

export interface AgeMarkProps {
    minutes: number;
    tone?: ChartTone;
    className?: string;
}

export function AgeMark({ minutes, tone, className }: AgeMarkProps) {
    return (
        <span
            className={cn(
                "text-xs font-medium tabular-nums",
                chartToneText[tone ?? ageTone(minutes)],
                className,
            )}
        >
            {formatAge(minutes)}
        </span>
    );
}

AgeMark.displayName = "AgeMark";
