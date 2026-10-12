"use client";

import { PayoutDealCell } from "@/components/features/admin/payout-deal-cell";
import { PayoutDetail } from "@/components/features/admin/payout-detail";
import { PayoutDetailActions } from "@/components/features/admin/payout-detail-actions";
import { PayoutPayeeCell } from "@/components/features/admin/payout-payee-cell";
import { PayoutPhaseBadge } from "@/components/features/admin/payout-phase-badge";
import { PaidMute } from "@/components/features/admin/paid-mute";
import { PAYOUT_PHASES } from "@/lib/config/payout-tones";
import { payoutNet, payoutTotals } from "@/lib/data/admin-payments";
import {
    payoutMoment,
    payoutPhaseOf,
    payoutTiming,
} from "@/lib/data/admin-payout-phase";
import { formatCompactUsd, formatCountOf } from "@/lib/utils";
import type { DataTableConfig, Payout, PayoutConfigOptions } from "@/lib/types";

const MIN_WIDTH = "40rem";
const PAGE_SIZE = 12;
const PAYOUT_NOUN = "payout";
const CAPTION =
    "Agent payouts, disputes and releases waiting on a decision first: payee, deal, buyer, status, timing, gross and net. Open a row for the platform fee and the release steps";

export function buildPayoutConfig({
    onSettle,
    now = new Date(),
}: PayoutConfigOptions): DataTableConfig<Payout> {
    const phaseOf = (payout: Payout) => payoutPhaseOf(payout, now);

    return {
        variant: "bare",
        caption: CAPTION,
        emptyMessage: "No payout matches this search",
        rowKey: (payout) => payout.id,
        rowLabel: (payout) => `${payout.recipient} · ${payout.deal}`,
        minWidth: MIN_WIDTH,
        pageSize: PAGE_SIZE,
        reveal: "panel",
        panelSize: "md",
        panelTitle: (payout) => payout.recipient,
        renderDetail: (payout) => <PayoutDetail payout={payout} />,
        panelFooter: (payout) => (
            <PayoutDetailActions payout={payout} onSettle={onSettle} />
        ),
        columns: [
            {
                id: "payee",
                label: "Payee",
                width: "12rem",
                emphasis: "identity",
                sortValue: (payout) => payout.recipient,
                render: (payout) => <PayoutPayeeCell name={payout.recipient} />,
                footer: (rows) => formatCountOf(rows.length, PAYOUT_NOUN),
            },
            {
                id: "deal",
                label: "Deal",
                sortValue: (payout) => payout.deal,
                render: (payout) => (
                    <PayoutDealCell
                        deal={payout.deal}
                        locality={payout.locality}
                    />
                ),
            },
            {
                id: "buyer",
                wide: true,
                label: "Buyer",
                width: "10.5rem",
                emphasis: "muted",
                sortValue: (payout) => payout.buyer,
                render: (payout) => (
                    <span className="block truncate">{payout.buyer}</span>
                ),
            },
            {
                id: "status",
                label: "Status",
                width: "8.5rem",
                sortValue: (payout) => PAYOUT_PHASES[phaseOf(payout)].rank,
                render: (payout) => (
                    <PayoutPhaseBadge phase={phaseOf(payout)} />
                ),
            },
            {
                id: "when",
                wide: true,
                label: "When",
                width: "7rem",
                emphasis: "muted",
                sortValue: (payout) => payoutMoment(payout, now),
                render: (payout) => payoutTiming(payout, now),
            },
            {
                id: "gross",
                wide: true,
                label: "Gross",
                align: "right",
                width: "5.5rem",
                emphasis: "muted",
                sortValue: (payout) => payout.gross,
                render: (payout) => formatCompactUsd(payout.gross),
                footer: (rows) => formatCompactUsd(payoutTotals(rows).gross),
            },
            {
                id: "net",
                label: "Net",
                align: "right",
                width: "6rem",
                emphasis: "value",
                sortValue: payoutNet,
                render: (payout) => (
                    <PaidMute payout={payout}>
                        {formatCompactUsd(payoutNet(payout))}
                    </PaidMute>
                ),
                footer: (rows) => (
                    <span className="text-text">
                        {formatCompactUsd(payoutTotals(rows).net)}
                    </span>
                ),
            },
        ],
    };
}
