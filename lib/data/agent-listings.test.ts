import { describe, expect, it } from "vitest";
import { isFeatured } from "@/lib/data/agent-listings";
import type { ManagedListing } from "@/lib/types";

const DAY_MS = 86_400_000;

const listing = (featuredUntil: string | null): ManagedListing => ({
    id: "l1",
    address: "12 Elm Street",
    locality: "Beacon Hill",
    photo: "",
    price: 4_750_000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    status: "active",
    listedDaysAgo: 12,
    views: 400,
    saves: 20,
    showings: 6,
    offers: 2,
    featuredUntil,
});

describe("isFeatured", () => {
    it("treats a listing whose promotion has not run out as featured", () => {
        const tomorrow = new Date(Date.now() + DAY_MS).toISOString();

        expect(isFeatured(listing(tomorrow))).toBe(true);
    });

    it("stops calling a listing featured once the promotion has lapsed", () => {
        const yesterday = new Date(Date.now() - DAY_MS).toISOString();

        expect(isFeatured(listing(yesterday))).toBe(false);
    });

    it("treats a listing that was never promoted as not featured", () => {
        expect(isFeatured(listing(null))).toBe(false);
    });
});
