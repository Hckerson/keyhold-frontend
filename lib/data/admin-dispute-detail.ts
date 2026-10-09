import { DISPUTE_STATES } from "@/lib/config/dispute-tones";
import { ESCROW_STATES } from "@/lib/config/escrow-tones";
import { DISPUTE_COPY, disputeClock } from "@/lib/data/admin-disputes";
import { decidedOn } from "@/lib/data/review-queue";
import { formatFullDate, formatUsd, mailHref } from "@/lib/utils";
import type {
    DisputeCase,
    DisputedDeal,
    Fact,
    ReviewOutcomeView,
} from "@/lib/types";

const STILL_FROZEN = "Escrow still frozen";
const NO_DEAL = {
    id: "none",
    facts: [{ label: "Deal", value: "None attached" }],
};

export const raisedLine = (dispute: DisputeCase) =>
    `Raised by ${dispute.initiator} · ${formatFullDate(new Date(dispute.openedAt))}`;

const dealFacts = (deal: DisputedDeal): Fact[] => [
    { label: "Property", value: deal.property },
    { label: "Address", value: deal.address },
    { label: "Deal price", value: formatUsd(deal.price) },
    ...(deal.escrow
        ? [
              {
                  label: "Escrow",
                  value: `${formatUsd(deal.escrow.amount)} · ${ESCROW_STATES[deal.escrow.status].label}`,
              },
          ]
        : []),
];

export const stakeGroups = (dispute: DisputeCase) =>
    dispute.deals.length === 0
        ? [NO_DEAL]
        : dispute.deals.map((deal) => ({
              id: deal.id,
              facts: dealFacts(deal),
          }));

export const partyFacts = (dispute: DisputeCase): Fact[] => [
    { label: "Member", value: dispute.initiator },
    ...(dispute.initiatorEmail
        ? [
              {
                  label: "Email",
                  value: dispute.initiatorEmail,
                  href: mailHref(dispute.initiatorEmail),
              },
          ]
        : []),
    { label: "Opened", value: formatFullDate(new Date(dispute.openedAt)) },
];

const escrowFate = (dispute: DisputeCase) => {
    const escrow = dispute.deals.find((deal) => deal.escrow)?.escrow;
    if (!escrow) return undefined;
    return escrow.status === "DISPUTED"
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
