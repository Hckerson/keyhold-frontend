import type { ModerationListing } from "@/lib/types";
import type {
    Flag,
    FlagPage,
    FlagPropertyTarget,
} from "@/lib/validations/flag";

const AT = "2026-08-01T09:00:00.000Z";

export const aFlaggedListing = (
    overrides: Partial<FlagPropertyTarget> = {},
): FlagPropertyTarget => ({
    kind: "PROPERTY",
    id: "prop_1",
    title: "Harbour House",
    address: "12 Harbour Row",
    locality: "Sausalito",
    price: 2_400_000,
    status: "AVAILABLE",
    image: null,
    images: [],
    description: "Waterfront residence",
    sqFt: null,
    sellerId: "usr_2",
    sellerName: "Noor Hale",
    sellerEmail: "noor@coastal.co",
    sellerPhone: null,
    sellerLicensed: true,
    sellerVerified: true,
    ...overrides,
});

export const aPropertyFlag = (
    overrides: Partial<Omit<Flag, "target">> = {},
    listing: Partial<FlagPropertyTarget> = {},
): Flag => {
    const target = aFlaggedListing(listing);
    return {
        id: "flg_1",
        type: "PROPERTY",
        reason: "Photos do not match the address",
        details: null,
        status: "ACTIVE",
        targetId: target.id,
        creatorId: "usr_3",
        resolvedAt: null,
        createdAt: AT,
        updatedAt: AT,
        ...overrides,
        target,
    };
};

export const aFlagPage = (items: Flag[] = []): FlagPage => ({
    items,
    total: items.length,
    page: 1,
    limit: items.length,
    pageCount: 1,
});

export const aModerationListing = (
    overrides: Partial<ModerationListing> = {},
): ModerationListing => ({
    id: "flg_1",
    listingId: "prop_1",
    title: "Harbour House",
    address: "12 Harbour Row",
    locality: "Sausalito",
    price: 2_400_000,
    status: "pending",
    queuedMinutes: 90,
    description: "Waterfront residence",
    photos: [],
    compliance: { photos: "pass", accuracy: "pass", licence: "pass" },
    reports: 1,
    agent: { name: "Noor Hale", email: "noor@coastal.co", phone: null },
    ...overrides,
});
