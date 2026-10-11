import {
    DISPUTE_DECISION_COPY,
    DISPUTE_STATES,
} from "@/lib/config/dispute-tones";
import { ESCROW_STATES } from "@/lib/config/escrow-tones";
import { DISPUTE_COPY, disputeClock } from "@/lib/data/admin-disputes";
import { decidedOn, openFor } from "@/lib/data/review-queue";
import type { EscrowStatus } from "@/lib/enums/enums";
import { formatFullDate, formatUsd, mailHref, sum } from "@/lib/utils";
import type {
    DealParty,
    DisputeCase,
    DisputeDecisionCopy,
    DisputeDecisionMode,
    DisputedDeal,
    Fact,
    ReviewOutcomeView,
} from "@/lib/types";

const FROZEN: EscrowStatus = "DISPUTED";
const STILL_FROZEN = "Escrow still frozen";
const NO_DEAL = {
    id: "none",
    facts: [{ label: "Deal", value: "None attached" }],
};

export const raisedLine = (dispute: DisputeCase) =>
    `Raised by ${dispute.initiator} · ${formatFullDate(new Date(dispute.openedAt))}`;

const escrowValue = ({
    amount,
    status,
}: {
    amount: number;
    status: EscrowStatus;
}) =>
    status === FROZEN
        ? `${formatUsd(amount)} frozen`
        : `${formatUsd(amount)} · ${ESCROW_STATES[status].label}`;

const dealFacts = (deal: DisputedDeal): Fact[] => [
    { label: "Property", value: deal.property },
    { label: "Address", value: deal.address },
    { label: "Deal price", value: formatUsd(deal.price) },
    ...(deal.escrow
        ? [{ label: "Escrow", value: escrowValue(deal.escrow) }]
        : []),
];

export const stakeGroups = (dispute: DisputeCase) =>
    dispute.deals.length === 0
        ? [NO_DEAL]
        : dispute.deals.map((deal) => ({
              id: deal.id,
              facts: dealFacts(deal),
          }));

export const frozenAmount = (dispute: DisputeCase) =>
    sum(
        dispute.deals.map((deal) =>
            deal.escrow?.status === FROZEN ? deal.escrow.amount : 0,
        ),
    );

export const openLine = (dispute: DisputeCase, now = new Date()) => {
    const frozen = frozenAmount(dispute);
    return [
        DISPUTE_STATES[dispute.status].label,
        `open ${openFor(disputeClock(dispute), now)}`,
        ...(frozen ? [`${formatUsd(frozen)} frozen`] : []),
    ].join(" · ");
};

const partiesOf = (dispute: DisputeCase) =>
    dispute.deals.find((deal) => deal.parties)?.parties ?? null;

const sideValue = (party: DealParty, dispute: DisputeCase) =>
    party.id === dispute.initiatorId
        ? `${party.name} · ${DISPUTE_COPY.raisedIt}`
        : party.name;

export const partyFacts = (dispute: DisputeCase): Fact[] => {
    const parties = partiesOf(dispute);
    const sides = parties
        ? [
              { label: "Buyer", value: sideValue(parties.buyer, dispute) },
              { label: "Seller", value: sideValue(parties.seller, dispute) },
          ]
        : [{ label: "Raised by", value: dispute.initiator }];
    return [
        ...sides,
        ...(dispute.initiatorEmail
            ? [
                  {
                      label: "Contact",
                      value: dispute.initiatorEmail,
                      href: mailHref(dispute.initiatorEmail),
                  },
              ]
            : []),
    ];
};

export const decisionCopy = (
    mode: DisputeDecisionMode,
    dispute: DisputeCase | null,
): DisputeDecisionCopy => {
    const copy = DISPUTE_DECISION_COPY[mode];
    const parties = dispute && partiesOf(dispute);
    const amount = dispute ? frozenAmount(dispute) : 0;
    if (!copy.payout || !parties || !amount) return copy;
    return {
        ...copy,
        title: `${copy.payout.verb} ${formatUsd(amount)} to ${parties[copy.payout.to].name}`,
    };
};

const escrowFate = (dispute: DisputeCase) => {
    const escrow = dispute.deals.find((deal) => deal.escrow)?.escrow;
    if (!escrow) return undefined;
    return escrow.status === FROZEN
        ? STILL_FROZEN
        : `Escrow ${ESCROW_STATES[escrow.status].label.toLowerCase()}`;
};

export const disputeOutcome = (dispute: DisputeCase): ReviewOutcomeView => ({
    tone: DISPUTE_STATES[dispute.status].tone,
    label: DISPUTE_STATES[dispute.status].label,
    date: decidedOn(disputeClock(dispute)),
    detail: escrowFate(dispute),
    noteHeading: DISPUTE_COPY.resolutionHeading,
    note: dispute.resolution,
});
