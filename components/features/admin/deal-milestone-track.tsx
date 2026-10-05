import {
    MILESTONE_ORDER,
    TRANSACTION_MILESTONES,
} from "@/lib/config/transaction-tones";
import { cn } from "@/lib/utils";
import type { TransactionMilestoneId } from "@/lib/types";

const CLEARED = "cleared";
const NEXT = "next";
const WAITING = "waiting";

export interface DealMilestoneTrackProps {
    cleared: TransactionMilestoneId[];
    open: boolean;
    className?: string;
}

export function DealMilestoneTrack({
    cleared,
    open,
    className,
}: DealMilestoneTrackProps) {
    const next = open
        ? MILESTONE_ORDER.find((id) => !cleared.includes(id))
        : undefined;
    const stateOf = (id: TransactionMilestoneId) =>
        cleared.includes(id) ? CLEARED : id === next ? NEXT : WAITING;

    return (
        <span
            role="img"
            aria-label={MILESTONE_ORDER.map(
                (id) => `${TRANSACTION_MILESTONES[id].label} ${stateOf(id)}`,
            ).join(", ")}
            className={cn("flex items-center gap-1.5", className)}
        >
            {MILESTONE_ORDER.map((id) => {
                const { icon: Icon, label } = TRANSACTION_MILESTONES[id];
                const state = stateOf(id);

                return (
                    <span
                        key={id}
                        title={`${label}: ${state}`}
                        className="flex"
                    >
                        <Icon
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className={cn(
                                "size-3.5",
                                state === CLEARED &&
                                    (open ? "text-success" : "text-text-muted"),
                                state === NEXT && "text-warning",
                                state === WAITING && "text-border-dark",
                            )}
                        />
                    </span>
                );
            })}
        </span>
    );
}

DealMilestoneTrack.displayName = "DealMilestoneTrack";
