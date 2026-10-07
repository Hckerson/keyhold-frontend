"use client";

import { AgeMark } from "@/components/features/shared/age-mark";
import { PayoutDetail } from "@/components/features/admin/payout-detail";
import { PayoutAgentMark } from "@/components/features/admin/payout-agent-mark";
import { PayoutDetailActions } from "@/components/features/admin/payout-detail-actions";
import { PaidMute } from "@/components/features/admin/paid-mute";
import { PayoutHeldMark } from "@/components/features/admin/payout-held-mark";
import { PayoutSettleButton } from "@/components/features/admin/payout-settle-button";
import { SETTLE_TRIGGER_LABEL } from "@/lib/config/escrow-settle";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import {
    inspectionDaysLeft,
    inspectionLabel,
    payoutNet,
    payoutTotals,
    oldestHeld,
    PAYOUT_GROUPS,
    payoutGroupOf,
} from "@/lib/data/admin-payments";
import { formatCompactUsd } from "@/lib/utils";
import type { DataTableConfig, Payout } from "@/lib/types";

const MIN_WIDTH = "46rem";
const PAYOUTS_NOUN = "payouts";
const CAPTION =
    "Agent payouts grouped by what they need: disputed, ready to release, in inspection and paid out; with agent, deal, inspection window, time held and net. Open a row for gross and platform fee";

export function buildPayoutConfig(
    onSettle: (payout: Payout) => void,
): DataTableConfig<Payout> {
    return {
        variant: "bare",
        caption: CAPTION,
        emptyMessage: "No payout matches this search",
        rowKey: (payout) => payout.id,
        rowLabel: (payout) => `${payout.recipient} · ${payout.deal}`,
        defaultSort: { id: "held", direction: "desc" },
        grouping: {
            groups: PAYOUT_GROUPS,
            of: (payout) => payoutGroupOf(payout),
        },
        minWidth: MIN_WIDTH,
        rowClassName: () => "reveal-scope",
        reveal: "panel",
        panelSize: "md",
        panelTitle: (payout) => payout.recipient,
        renderDetail: (payout) => <PayoutDetail payout={payout} />,
        panelFooter: (payout) => (
            <PayoutDetailActions payout={payout} onSettle={onSettle} />
        ),
        columns: [
            {
                id: "agent",
                label: "Agent",
                emphasis: "identity",
                sortValue: (payout) => payout.recipient,
                render: (payout) => <PayoutAgentMark payout={payout} />,
                footer: (rows) => `${rows.length} ${PAYOUTS_NOUN}`,
            },
            {
                id: "deal",
                label: "Deal",
                emphasis: "muted",
                sortValue: (payout) => payout.deal,
                render: (payout) => (
                    <span className="block truncate">{payout.deal}</span>
                ),
            },
            {
                id: "window",
                label: "Window",
                width: "6.5rem",
                emphasis: "muted",
                sortValue: (payout) => inspectionDaysLeft(payout) ?? -1,
                render: (payout) =>
                    PAYOUT_STATES[payout.state].held && inspectionLabel(payout),
            },
            {
                id: "held",
                label: "Held",
                align: "right",
                width: "3.5rem",
                sortValue: (payout) =>
                    PAYOUT_STATES[payout.state].held ? payout.ageMinutes : -1,
                render: (payout) => <PayoutHeldMark payout={payout} />,
                summary: (rows) => {
                    const oldest = oldestHeld(rows);
                    return (
                        oldest > 0 && (
                            <AgeMark
                                minutes={oldest}
                                tone="neutral"
                                className="font-normal"
                            />
                        )
                    );
                },
            },
            {
                id: "net",
                label: "Net",
                align: "right",
                width: "5rem",
                emphasis: "focal",
                sortValue: payoutNet,
                render: (payout) => (
                    <PaidMute payout={payout}>
                        {formatCompactUsd(payoutNet(payout))}
                    </PaidMute>
                ),
                summary: (rows) => (
                    <span className="text-text-secondary">
                        {formatCompactUsd(payoutTotals(rows).net)}
                    </span>
                ),
                footer: (rows) => (
                    <span className="text-text font-semibold">
                        {formatCompactUsd(payoutTotals(rows).net)}
                    </span>
                ),
            },
            {
                id: "settle",
                label: SETTLE_TRIGGER_LABEL,
                srOnlyLabel: true,
                align: "right",
                width: "4.5rem",
                render: (payout) => (
                    <PayoutSettleButton payout={payout} onSettle={onSettle} />
                ),
            },
        ],
    };
}
