import type { Offer } from "@/lib/types";

export const anOffer = (overrides: Partial<Offer> = {}): Offer => ({
    id: "off_1",
    listingId: "lst_1",
    address: "12 Shore House",
    locality: "Malibu",
    photo: null,
    agent: "Elena Voss",
    agentPortrait: null,
    listPrice: 4_200_000,
    offerPrice: 4_050_000,
    status: "submitted",
    minutesAgo: 40,
    note: "Cash, fourteen-day close",
    ...overrides,
});
