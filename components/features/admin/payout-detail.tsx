import { PayoutReceipt } from "@/components/features/admin/payout-receipt";
import { PayoutStateMark } from "@/components/features/admin/payout-state-mark";
import { PayoutStepList } from "@/components/features/admin/payout-step-list";
import { payoutNet } from "@/lib/data/admin-payments";
import { payoutSteps } from "@/lib/data/admin-payout-detail";
import { formatUsd } from "@/lib/utils";
import type { Payout } from "@/lib/types";

const NET_LABEL = "Net to agent";
const CARD = "bg-background border-border-light rounded-xl border p-4";

export interface PayoutDetailProps {
    payout: Payout;
}

export function PayoutDetail({ payout }: PayoutDetailProps) {
    return (
        <div className="flex flex-col gap-3">
            <section className={CARD}>
                <div className="flex items-center justify-between gap-3 text-xs">
                    <p className="micro-label">{NET_LABEL}</p>
                    <PayoutStateMark state={payout.state} />
                </div>
                <p className="font-display text-h4 text-text mt-3 leading-none font-light tabular-nums">
                    {formatUsd(payoutNet(payout))}
                </p>
                <p className="text-text-secondary mt-2 truncate text-xs">
                    {payout.deal}
                </p>
            </section>
            <div className={CARD}>
                <PayoutReceipt payout={payout} />
            </div>
            <div className={CARD}>
                <PayoutStepList steps={payoutSteps(payout)} />
            </div>
        </div>
    );
}

PayoutDetail.displayName = "PayoutDetail";
