import { ShareMeter } from "@/components/patterns/share-meter";
import {
    errorBudgetUsed,
    loadTone,
    UPTIME_SLO,
} from "@/lib/config/admin-tones";

export interface ErrorBudgetMeterProps {
    uptime: number;
    label: string;
}

export function ErrorBudgetMeter({ uptime, label }: ErrorBudgetMeterProps) {
    const used = errorBudgetUsed(uptime);

    return (
        <ShareMeter
            percent={used}
            tone={loadTone(used)}
            label={`${label} has spent ${used}% of its ${UPTIME_SLO}% uptime budget`}
            barClassName="w-14"
        />
    );
}

ErrorBudgetMeter.displayName = "ErrorBudgetMeter";
