import { ToneReading } from "@/components/patterns/tone-reading";
import {
    errorBudgetUsed,
    loadTone,
    UPTIME_SLO,
} from "@/lib/config/admin-tones";

export interface ErrorBudgetMarkProps {
    uptime: number;
    label: string;
}

export function ErrorBudgetMark({ uptime, label }: ErrorBudgetMarkProps) {
    const used = errorBudgetUsed(uptime);

    return (
        <ToneReading
            value={`${used}%`}
            tone={loadTone(used)}
            label={`${label} has spent ${used}% of its ${UPTIME_SLO}% uptime budget`}
        />
    );
}

ErrorBudgetMark.displayName = "ErrorBudgetMark";
