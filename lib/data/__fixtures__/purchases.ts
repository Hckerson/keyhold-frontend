import type { EscrowRelease } from "@/lib/validations/escrow";
import type { Purchase } from "@/lib/types";
import type { EscrowHold, Transaction } from "@/lib/validations/transaction";

const ISO = "2026-08-01T00:00:00.000Z";

export const anEscrowHold = (
    overrides: Partial<EscrowHold> = {},
): EscrowHold => ({
    id: "esc_1",
    amount: 1_200_000,
    inspectionEndDate: "2026-09-01T00:00:00.000Z",
    stripeTransferId: null,
    stripeAccountId: null,
    status: "HELD",
    releasedAt: null,
    refundedAt: null,
    createdAt: ISO,
    updatedAt: ISO,
    ...overrides,
});

export const anEscrowRelease = (
    overrides: Partial<EscrowRelease> = {},
): EscrowRelease => ({
    escrow: { ...anEscrowHold(), status: "RELEASED", transaction: null },
    agreementUrl: "https://cdn.example.com/agreement.pdf",
    ...overrides,
});

export const aTransaction = (
    overrides: Partial<Transaction> = {},
): Transaction => ({
    id: "txn_1",
    status: "IN_PROGRESS",
    finalPrice: 1_150_000,
    terms: "Cash, thirty-day close",
    agreementDocUrl: "https://cdn.example.com/agreement.pdf",
    stripePaymentIntentId: "pi_1",
    connectionId: "con_1",
    propertyId: "prop_1",
    buyerId: "usr_buyer",
    sellerId: "usr_seller",
    escrowHoldId: "esc_1",
    disputeId: null,
    seller: { id: "usr_seller", fullName: "Marta Vance", avatar: null },
    property: {
        id: "prop_1",
        title: "Cypress Point",
        price: 1_250_000,
        address: "18 Cypress Point",
        locality: "Carmel",
        status: "AVAILABLE",
        images: [
            { id: "img_1", url: "https://cdn.example.com/1.jpg", order: 0 },
        ],
    },
    escrowHold: anEscrowHold(),
    completedAt: null,
    createdAt: ISO,
    updatedAt: ISO,
    ...overrides,
});

export const aPurchase = (overrides: Partial<Purchase> = {}): Purchase => ({
    id: "txn_1",
    listingId: "prop_1",
    address: "18 Cypress Point",
    locality: "Carmel",
    photo: null,
    price: 1_150_000,
    status: "IN_PROGRESS",
    seller: "Marta Vance",
    sellerPortrait: null,
    escrowId: "esc_1",
    escrowStatus: "HELD",
    escrowAmount: 1_200_000,
    inspectionEndsAt: "2026-09-01T00:00:00.000Z",
    agreementUrl: null,
    disputeId: null,
    startedAt: ISO,
    completedAt: null,
    ...overrides,
});
