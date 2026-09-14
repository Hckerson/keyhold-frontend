"use client";

import { m } from "motion/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AgeMark } from "@/components/features/shared/age-mark";
import { Button } from "@/components/ui/button";
import { PayoutAmount } from "@/components/features/admin/payout-amount";
import { PayoutStateMark } from "@/components/features/admin/payout-state-mark";
import { payoutAgeTone, PAYOUT_STATES } from "@/lib/config/admin-tones";
import {
    inspectionLabel,
    payoutFee,
    payoutNet,
} from "@/lib/data/admin-payments";
import {
    SETTLE_TRIGGER_LABEL,
    SETTLE_ACTION_LABEL,
} from "@/lib/config/escrow-settle";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";
import type { Payout } from "@/lib/types";

const OPEN_LABEL = "Open the deal behind";

export interface PayoutRowProps {
    payout: Payout;
    onSettle?: (payout: Payout) => void;
}

export function PayoutRow({ payout, onSettle }: PayoutRowProps) {
    const settleable = PAYOUT_STATES[payout.state].held;
    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className="ease-smooth hover:bg-background-muted h-11 transition-colors"
        >
            <td className="text-text truncate py-0 text-xs font-medium">
                {payout.recipient}
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {payout.deal}
            </td>
            <td className="py-0 pl-3">
                <PayoutStateMark state={payout.state} />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-xs tabular-nums">
                {inspectionLabel(payout)}
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
                <div className="flex items-center justify-end gap-1">
                    {settleable && onSettle && (
                        <Button
                            type="button"
                            emphasis="quiet"
                            size="sm"
                            aria-label={`${SETTLE_ACTION_LABEL} ${payout.recipient}`}
                            onClick={() => onSettle(payout)}
                        >
                            {SETTLE_TRIGGER_LABEL}
                        </Button>
                    )}
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
                </div>
            </td>
        </m.tr>
    );
}

PayoutRow.displayName = "PayoutRow";
