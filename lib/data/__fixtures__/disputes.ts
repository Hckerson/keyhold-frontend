import { anEscrowHold } from "@/lib/data/__fixtures__/purchases";
import { aLedgerDeal } from "@/lib/data/__fixtures__/transactions";
import type { DisputeCase } from "@/lib/types";
import type {
    Dispute,
    DisputeEvidence,
    DisputePage,
} from "@/lib/validations/dispute";
import type { Escrow } from "@/lib/validations/escrow";

export const DISPUTE_TODAY = new Date("2026-10-09T12:00:00Z");

const ISO = "2026-08-27T12:00:00.000Z";

export const anEvidence = (
    overrides: Partial<DisputeEvidence> = {},
): DisputeEvidence => ({
    id: "dev_1",
    type: "DOCUMENT",
    content: "https://files.example.com/evidence/closing-statement.pdf",
    label: "Closing statement",
    disputeId: "dsp_1",
    createdAt: "2026-08-29T12:00:00.000Z",
    updatedAt: ISO,
    ...overrides,
});

export const aDispute = (overrides: Partial<Dispute> = {}): Dispute => ({
    id: "dsp_1",
    title: "Escrow held past the agreed release date",
    status: "PENDING_REVIEW",
    description: "Funds remained in escrow past the release date.",
    resolutionNotes: null,
    initiatorId: "usr_buyer",
    initiator: {
        id: "usr_buyer",
        fullName: "Christ Streich",
        email: "christ@example.com",
    },
    evidence: [anEvidence()],
    transactions: [
        {
            id: "txn_1",
            finalPrice: 2_240_000,
            status: "IN_PROGRESS",
            escrowHoldId: "esc_1",
            property: {
                id: "prop_1",
                title: "Jackson Street Flat",
                address: "3120 Jackson Street",
            },
        },
    ],
    resolvedAt: null,
    createdAt: ISO,
    updatedAt: ISO,
    ...overrides,
});

export const aDisputePage = (items: Dispute[] = [aDispute()]): DisputePage => ({
    items,
    total: items.length,
    page: 1,
    limit: 100,
    pageCount: 1,
});

export const aFrozenHold = (overrides: Partial<Escrow> = {}): Escrow => ({
    ...anEscrowHold({ amount: 67_200, status: "DISPUTED" }),
    transaction: aLedgerDeal({
        buyer: { id: "usr_buyer", fullName: "Christ Streich" },
    }),
    ...overrides,
});

export const aDisputeCase = (
    overrides: Partial<DisputeCase> = {},
): DisputeCase => ({
    id: "dsp_1",
    title: "Escrow held past the agreed release date",
    claim: "Funds remained in escrow past the release date.",
    status: "PENDING_REVIEW",
    initiator: "Christ Streich",
    initiatorId: "usr_buyer",
    initiatorEmail: "christ@example.com",
    openedAt: ISO,
    decidedAt: null,
    resolution: null,
    deals: [
        {
            id: "txn_1",
            property: "Jackson Street Flat",
            address: "3120 Jackson Street",
            price: 2_240_000,
            holdId: "esc_1",
            escrow: { amount: 67_200, status: "DISPUTED" },
            parties: {
                buyer: { id: "usr_buyer", name: "Christ Streich" },
                seller: { id: "usr_seller", name: "Marta Vance" },
            },
        },
    ],
    evidence: [],
    ...overrides,
});
