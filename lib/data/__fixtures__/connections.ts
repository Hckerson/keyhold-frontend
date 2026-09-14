import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { ContactActivity } from "@/lib/validations/contact";
import type { Offer } from "@/lib/validations/offer";
import type { Transaction } from "@/lib/validations/transaction";
import type { Viewing } from "@/lib/validations/viewing";

const AT = "2026-08-01T09:00:00.000Z";
export const PROPERTY_ID = "prp_1";

const party = (id: string, fullName: string) => ({ id, fullName });

export const anOfferRecord = (overrides: Partial<Offer> = {}): Offer => ({
    id: "off_1",
    status: "PENDING",
    offeredPrice: 4_050_000,
    offeredTerms: "Cash, fourteen-day close",
    responsePrice: null,
    responseFeedback: null,
    connectionId: "con_1",
    propertyId: PROPERTY_ID,
    offererId: "usr_buyer",
    responseFromId: null,
    expiresAt: "2026-08-15T09:00:00.000Z",
    respondedAt: null,
    createdAt: AT,
    updatedAt: AT,
    ...overrides,
});

export const aViewingRecord = (overrides: Partial<Viewing> = {}): Viewing => ({
    id: "vwg_1",
    status: "PENDING",
    mode: "IN_PERSON",
    durationMinutes: 45,
    proposedTimes: ["2026-08-05T15:00:00.000Z"],
    confirmedTime: null,
    notes: null,
    connectionId: "con_1",
    propertyId: PROPERTY_ID,
    requestedById: "usr_buyer",
    proposedByid: "usr_seller",
    createdAt: AT,
    updatedAt: AT,
    ...overrides,
});

export const aContactActivity = (
    overrides: Partial<ContactActivity> = {},
): ContactActivity => ({
    id: "cta_1",
    connectionId: "con_1",
    actorId: "usr_seller",
    channel: "EMAIL",
    direction: "OUTBOUND",
    status: "SENT",
    subject: "About Shore House",
    body: "Following up on your enquiry.",
    providerRef: null,
    durationSeconds: null,
    occurredAt: AT,
    createdAt: AT,
    updatedAt: AT,
    ...overrides,
});

export const aConnection = (
    overrides: Partial<ConnectionListItem> = {},
): ConnectionListItem => ({
    id: "con_1",
    status: "ACCEPTED",
    buyerId: "usr_buyer",
    sellerId: "usr_seller",
    propertyId: PROPERTY_ID,
    buyer: party("usr_buyer", "Ada Iwu"),
    seller: party("usr_seller", "Elena Voss"),
    property: {
        id: PROPERTY_ID,
        title: "Shore House",
        price: 4_200_000,
        address: "12 Shore House",
        locality: "Malibu",
        status: "AVAILABLE",
        images: [],
    },
    messages: [],
    offers: [],
    viewings: [],
    contactActivities: [],
    _count: { messages: 0, viewings: 0, offers: 0 },
    createdAt: AT,
    updatedAt: AT,
    ...overrides,
});

export const aPurchaseRecord = (
    overrides: Partial<Transaction> = {},
): Transaction => ({
    id: "trx_1",
    status: "IN_PROGRESS",
    finalPrice: 4_100_000,
    terms: "Cash, fourteen-day close",
    agreementDocUrl: null,
    stripePaymentIntentId: null,
    connectionId: "con_1",
    propertyId: PROPERTY_ID,
    buyerId: "usr_buyer",
    sellerId: "usr_seller",
    completedAt: null,
    createdAt: AT,
    updatedAt: AT,
    ...overrides,
});
