import { TRANSACTION_MILESTONES } from "@/lib/config/transaction-tones";
import { chartToneSoft, chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { TransactionMilestoneId } from "@/lib/types";

const CLEARED_LABEL = "Cleared";
const WAITING_LABEL = "Waiting";

export interface TransactionMilestoneMarkProps {
    id: TransactionMilestoneId;
    cleared: boolean;
}

export function TransactionMilestoneMark({
    id,
    cleared,
}: TransactionMilestoneMarkProps) {
    const { icon: Icon, label } = TRANSACTION_MILESTONES[id];
    const tone = cleared ? "success" : "neutral";

    return (
        <li className="flex min-w-0 items-center gap-2">
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[tone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                {label}
            </span>
            <span
                className={cn(
                    "shrink-0 text-xs font-medium",
                    chartToneText[tone],
                )}
            >
                {cleared ? CLEARED_LABEL : WAITING_LABEL}
            </span>
        </li>
    );
}

TransactionMilestoneMark.displayName = "TransactionMilestoneMark";
