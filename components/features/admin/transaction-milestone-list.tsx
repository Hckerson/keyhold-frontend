import { TransactionMilestoneMark } from "@/components/features/admin/transaction-milestone-mark";
import { MILESTONE_ORDER } from "@/lib/config/transaction-tones";
import type { TransactionMilestoneId } from "@/lib/types";

export interface TransactionMilestoneListProps {
    cleared: TransactionMilestoneId[];
}

export function TransactionMilestoneList({
    cleared,
}: TransactionMilestoneListProps) {
    return (
        <ul className="grid gap-1.5 sm:grid-cols-2">
            {MILESTONE_ORDER.map((id) => (
                <TransactionMilestoneMark
                    key={id}
                    id={id}
                    cleared={cleared.includes(id)}
                />
            ))}
        </ul>
    );
}

TransactionMilestoneList.displayName = "TransactionMilestoneList";
