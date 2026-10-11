"use client";

import { DealFlowCell } from "@/components/features/admin/deal-flow-cell";
import type { TransactionStatusFilter } from "@/lib/data/admin-transactions";
import type { DealFlowStage } from "@/lib/types";

const BAND_LABEL = "Deal volume by stage; pick a stage to filter the ledger";
const EVERY_STAGE: TransactionStatusFilter = "all";

export interface AdminTransactionsStatBandProps {
    stages: DealFlowStage[];
    active: TransactionStatusFilter;
    pending?: boolean;
    failed?: boolean;
    onChange: (next: TransactionStatusFilter) => void;
}

export function AdminTransactionsStatBand({
    stages,
    active,
    pending,
    failed,
    onChange,
}: AdminTransactionsStatBandProps) {
    return (
        <section
            aria-label={BAND_LABEL}
            aria-busy={pending || undefined}
            className="console-split console-split--flow border-border bg-border gap-px overflow-hidden rounded-xl border shadow-sm"
        >
            {stages.map((stage) => (
                <DealFlowCell
                    key={stage.id}
                    stage={stage}
                    active={stage.id === active}
                    pending={pending || failed}
                    onSelect={() =>
                        onChange(stage.id === active ? EVERY_STAGE : stage.id)
                    }
                />
            ))}
        </section>
    );
}

AdminTransactionsStatBand.displayName = "AdminTransactionsStatBand";
