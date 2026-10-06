"use client";

import { PayoutDetail } from "@/components/features/admin/payout-detail";
import { PayoutDetailActions } from "@/components/features/admin/payout-detail-actions";
import { PaidMute } from "@/components/features/admin/paid-mute";
import { PayoutHeldMark } from "@/components/features/admin/payout-held-mark";
import { PayoutSettleButton } from "@/components/features/admin/payout-settle-button";
import { PayoutStateMark } from "@/components/features/admin/payout-state-mark";
import { SETTLE_TRIGGER_LABEL } from "@/lib/config/escrow-settle";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import {
    inspectionDaysLeft,
    inspectionLabel,
    payoutNet,
    payoutTotals,
    stateRank,
} from "@/lib/data/admin-payments";
import { formatCompactUsd } from "@/lib/utils";
import type { DataTableConfig, Payout } from "@/lib/types";

const PAGE_SIZE = 10;
const PAYOUTS_NOUN = "payouts";
const CAPTION =
    "Agent payouts by state, agent, deal, inspection window, time held and net to the agent; disputes first. Open a row for gross and platform fee";

export function buildPayoutConfig(
    onSettle: (payout: Payout) => void,
): DataTableConfig<Payout> {
    return {
        variant: "bare",
        caption: CAPTION,
        emptyMessage: "No payout matches this search",
        rowKey: (payout) => payout.id,
        rowLabel: (payout) => `${payout.recipient} · ${payout.deal}`,
        defaultSort: { id: "state", direction: "desc" },
        pageSize: PAGE_SIZE,
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
                id: "state",
                label: "State",
                width: "6.5rem",
                sortValue: stateRank,
                render: (payout) => <PayoutStateMark state={payout.state} />,
            },
            {
                id: "agent",
                label: "Agent",
                emphasis: "identity",
                sortValue: (payout) => payout.recipient,
                render: (payout) => (
                    <span className="block truncate">{payout.recipient}</span>
                ),
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
