import { format } from "date-fns";
import { Callout } from "@/components/ui/callout";
import { ModalBody } from "@/components/ui/modal";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import { TransactionFinancingMark } from "@/components/features/admin/transaction-financing-mark";
import { TransactionMilestoneList } from "@/components/features/admin/transaction-milestone-list";
import { TransactionPartyList } from "@/components/features/admin/transaction-party-list";
import { TransactionReviewMetrics } from "@/components/features/admin/transaction-review-metrics";
import { TRANSACTION_STATUSES } from "@/lib/config/transaction-tones";
import { parseLocalDate } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

const INITIATED_LABEL = "Initiated";
const FINANCING_LABEL = "Financing";
const MILESTONES_LABEL = "Escrow milestones";
const PARTIES_LABEL = "Parties";
const DATE_FORMAT = "MMM d, yyyy";

export interface TransactionReviewBodyProps {
    transaction: Transaction;
}

export function TransactionReviewBody({
    transaction,
}: TransactionReviewBodyProps) {
    const meta = TRANSACTION_STATUSES[transaction.status];
    const initiated = format(
        parseLocalDate(transaction.initiatedDate),
        DATE_FORMAT,
    );

    return (
        <ModalBody className="scroll-y max-h-[60vh] space-y-4 p-4">
            <TransactionReviewMetrics
                transaction={transaction}
                open={meta.open}
            />

            {meta.note && <Callout {...meta.note} />}

            <LabelledBlock label={FINANCING_LABEL}>
                <TransactionFinancingMark financing={transaction.financing} />
            </LabelledBlock>

            <LabelledBlock label={MILESTONES_LABEL}>
                <TransactionMilestoneList cleared={transaction.cleared} />
            </LabelledBlock>

            <LabelledBlock
                label={`${PARTIES_LABEL} · ${INITIATED_LABEL} ${initiated}`}
            >
                <TransactionPartyList transaction={transaction} />
            </LabelledBlock>
        </ModalBody>
    );
}

TransactionReviewBody.displayName = "TransactionReviewBody";
