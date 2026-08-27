import { describe, expect, it } from "vitest";
import {
    changedFields,
    toListingDraft,
    toPropertyInput,
} from "@/lib/data/listing-form";
import { EMPTY_LISTING_DRAFT } from "@/lib/config/listing-form";
import { createPropertySchema } from "@/lib/validations/property";
import type { Property } from "@/lib/validations/property";

const property: Property = {
    id: "p1",
    title: "Beacon Hill Townhouse",
    description: "A restored townhouse on the quiet side of the hill.",
    address: "12 Elm Street",
    locality: "Beacon Hill",
    region: "Massachusetts",
    postalCode: "02108",
    country: "US",
    latitude: null,
    longitude: null,
    price: 4_750_000,
    bedrooms: 4,
    bathrooms: 3,
    sqFt: 3200,
    lotSqFt: null,
    yearBuilt: 1998,
    walkScore: null,
    viewsCount: 12,
    featuredUntil: null,
    amenities: ["Pool", "Wine cellar"],
    features: ["Sea view"],
    type: "TOWNHOUSE",
    status: "AVAILABLE",
    sellerId: "s1",
    images: [],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("toListingDraft", () => {
    it("renders absent optional measures as empty strings, not the text null", () => {
        const draft = toListingDraft(property);

        expect(draft.lotSqFt).toBe("");
        expect(draft.sqFt).toBe("3200");
    });

    it("joins tag arrays into one comma-separated field the agent can edit", () => {
        expect(toListingDraft(property).amenities).toBe("Pool, Wine cellar");
    });
});

describe("toPropertyInput", () => {
    it("round-trips a loaded listing back into a payload the schema accepts", () => {
        const parsed = createPropertySchema.safeParse(
            toPropertyInput(toListingDraft(property)),
        );

        expect(parsed.success).toBe(true);
    });

    it("drops blank optional measures instead of sending zero", () => {
        const input = toPropertyInput(toListingDraft(property));

        expect(input.lotSqFt).toBeUndefined();
        expect(input.sqFt).toBe(3200);
    });

    it("splits tag text on commas and discards empty entries", () => {
        const input = toPropertyInput({
            ...EMPTY_LISTING_DRAFT,
            amenities: "Pool, , Gym ,",
        });

        expect(input.amenities).toEqual(["Pool", "Gym"]);
    });

    it("trims surrounding whitespace from free-text fields", () => {
        const input = toPropertyInput({
            ...EMPTY_LISTING_DRAFT,
            title: "  Beacon Hill  ",
        });

        expect(input.title).toBe("Beacon Hill");
    });

    it("leaves a non-numeric measure undefined rather than sending NaN", () => {
        const input = toPropertyInput({
            ...EMPTY_LISTING_DRAFT,
            price: "not a price",
        });

        expect(input.price).toBeUndefined();
    });
});

describe("changedFields", () => {
    it("sends nothing when the agent saves without editing anything", () => {
        const baseline = toListingDraft(property);
        const parsed = createPropertySchema.parse(toPropertyInput(baseline));

        expect(changedFields(parsed, baseline)).toEqual({});
    });

    it("sends only the field the agent actually edited", () => {
        const baseline = toListingDraft(property);
        const parsed = createPropertySchema.parse(
            toPropertyInput({ ...baseline, price: "5000000" }),
        );

        expect(changedFields(parsed, baseline)).toEqual({ price: 5_000_000 });
    });

    it("detects an edit inside a tag list rather than treating arrays as equal", () => {
        const baseline = toListingDraft(property);
        const parsed = createPropertySchema.parse(
            toPropertyInput({ ...baseline, amenities: "Pool" }),
        );

        expect(changedFields(parsed, baseline)).toEqual({
            amenities: ["Pool"],
        });
    });
});
