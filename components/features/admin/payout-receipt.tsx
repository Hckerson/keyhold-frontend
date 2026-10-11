import {
    FEE_RATE_LABEL,
    payoutFee,
    payoutNet,
} from "@/lib/data/admin-payments";
import { formatUsd } from "@/lib/utils";
import type { Payout } from "@/lib/types";

const TITLE = "Settlement";
const GROSS_LABEL = "Gross";
const FEE_LABEL = "Platform fee";
const NET_LABEL = "Net to agent";
const FEE_PREFIX = "−";

export interface PayoutReceiptProps {
    payout: Payout;
}

export function PayoutReceipt({ payout }: PayoutReceiptProps) {
    return (
        <section aria-label={TITLE} className="flex flex-col gap-3">
            <h3 className="micro-label">{TITLE}</h3>
            <dl className="flex flex-col text-xs tabular-nums">
                <div className="flex h-8 items-center justify-between gap-3">
                    <dt className="text-text-secondary">{GROSS_LABEL}</dt>
                    <dd className="text-text">{formatUsd(payout.gross)}</dd>
                </div>
                <div className="flex h-8 items-center justify-between gap-3">
                    <dt className="text-text-secondary">
                        {FEE_LABEL}{" "}
                        <span className="text-text-muted">
                            {FEE_RATE_LABEL}
                        </span>
                    </dt>
                    <dd className="text-text-secondary">
                        {FEE_PREFIX}
                        {formatUsd(payoutFee(payout))}
                    </dd>
                </div>
                <div className="border-border mt-1 flex h-9 items-center justify-between gap-3 border-t">
                    <dt className="text-text font-medium">{NET_LABEL}</dt>
                    <dd className="text-text">
                        {formatUsd(payoutNet(payout))}
                    </dd>
                </div>
            </dl>
        </section>
    );
}

PayoutReceipt.displayName = "PayoutReceipt";
