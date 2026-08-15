import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AgeMark } from "@/components/features/shared/age-mark";
import { PayoutAmount } from "@/components/features/admin/payout-amount";
import { PayoutMethodMark } from "@/components/features/admin/payout-method-mark";
import { PayoutStateMark } from "@/components/features/admin/payout-state-mark";
import { payoutAgeTone, PAYOUT_STATES } from "@/lib/config/admin-tones";
import { payoutFee, payoutNet } from "@/lib/data/admin-payments";
import type { Payout } from "@/lib/types";

const OPEN_LABEL = "Open the deal behind";

export interface PayoutRowProps {
    payout: Payout;
}

export function PayoutRow({ payout }: PayoutRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="text-text truncate py-0 text-xs font-medium">
                {payout.recipient}
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {payout.deal}
            </td>
            <td className="py-0 pl-3">
                <PayoutStateMark state={payout.state} />
            </td>
            <td className="py-0 pl-3">
                <PayoutMethodMark method={payout.method} />
            </td>
            <td className="py-0 pl-3 text-right">
                <PayoutAmount net={payoutNet(payout)} fee={payoutFee(payout)} />
            </td>
            <td className="py-0 pl-3 text-right">
                <AgeMark
                    minutes={payout.ageMinutes}
                    tone={
                        PAYOUT_STATES[payout.state].held
                            ? payoutAgeTone(payout.ageMinutes)
                            : "neutral"
                    }
                />
            </td>
            <td className="py-0 pl-3">
                <Link
                    href={payout.href}
                    aria-label={`${OPEN_LABEL} ${payout.recipient}`}
                    className="ease-smooth focus-visible:ring-accent text-text-muted hover:bg-accent-light hover:text-accent ml-auto grid size-5 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <ChevronRight
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </Link>
            </td>
        </tr>
    );
}

PayoutRow.displayName = "PayoutRow";
