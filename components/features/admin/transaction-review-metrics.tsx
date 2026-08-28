import { format } from "date-fns";
import { MetricCell } from "@/components/patterns/metric-cell";
import { ReviewMetricStrip } from "@/components/patterns/review-metric-strip";
import { AgeMark } from "@/components/features/shared/age-mark";
import { EscrowMeter } from "@/components/features/admin/escrow-meter";
import { dealAgeTone } from "@/lib/config/transaction-tones";
import {
    COMMISSION_RATE_LABEL,
    commissionOf,
} from "@/lib/data/admin-transactions";
import { formatMillions, formatThousands, parseLocalDate } from "@/lib/utils";
import type { LedgerTransaction } from "@/lib/types";

const PRICE_LABEL = "Sale price";
const ESCROW_LABEL = "Escrow cleared";
const AGE_LABEL = "Open for";
const CLOSE_LABEL = "Target close";
const NO_DATE = "—";
const DATE_FORMAT = "MMM d, yyyy";

export interface TransactionReviewMetricsProps {
    transaction: LedgerTransaction;
    open: boolean;
}

export function TransactionReviewMetrics({
    transaction,
    open,
}: TransactionReviewMetricsProps) {
    return (
        <ReviewMetricStrip>
            <MetricCell label={PRICE_LABEL}>
                <span className="tabular-nums">
                    {formatMillions(transaction.price, 2)}
                </span>
            </MetricCell>
            <MetricCell label={`Commission ${COMMISSION_RATE_LABEL}`}>
                <span className="tabular-nums">
                    {formatThousands(commissionOf(transaction))}
                </span>
            </MetricCell>
            <MetricCell label={ESCROW_LABEL}>
                <EscrowMeter
                    cleared={transaction.cleared.length}
                    label={transaction.property}
                    className="justify-start"
                />
            </MetricCell>
            <MetricCell label={AGE_LABEL}>
                <AgeMark
                    minutes={transaction.ageMinutes}
                    tone={
                        open ? dealAgeTone(transaction.ageMinutes) : "neutral"
                    }
                />
            </MetricCell>
            <MetricCell label={CLOSE_LABEL}>
                <span className="truncate tabular-nums">
                    {transaction.completedDate
                        ? format(
                              parseLocalDate(transaction.completedDate),
                              DATE_FORMAT,
                          )
                        : NO_DATE}
                </span>
            </MetricCell>
        </ReviewMetricStrip>
    );
}

TransactionReviewMetrics.displayName = "TransactionReviewMetrics";
