import { describe, expect, it } from "vitest";
import {
    changedFields,
    changedKeys,
    movedImageIds,
    toListingDraft,
    toPropertyInput,
} from "@/lib/data/listing-form";
import { EMPTY_LISTING_DRAFT } from "@/lib/config/listing-form";
import { listingFormSchema } from "@/lib/validations/property";
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

const draftOf = (change: Partial<typeof EMPTY_LISTING_DRAFT> = {}) => ({
    ...toListingDraft(property),
    ...change,
});

describe("toListingDraft", () => {
    it("renders absent optional measures as empty strings, not the text null", () => {
        const draft = toListingDraft(property);

        expect(draft.lotSqFt).toBe("");
        expect(draft.sqFt).toBe("3200");
    });

    it("carries every editable column onto the draft, map position included", () => {
        const draft = toListingDraft({
            ...property,
            latitude: 42.3583,
            longitude: -71.0636,
            walkScore: 96,
        });

        expect(draft.latitude).toBe("42.3583");
        expect(draft.longitude).toBe("-71.0636");
        expect(draft.walkScore).toBe("96");
        expect(draft.country).toBe("US");
        expect(draft.status).toBe("AVAILABLE");
    });

    it("keeps tags as a list so each entry stays separately removable", () => {
        expect(toListingDraft(property).amenities).toEqual([
            "Pool",
            "Wine cellar",
        ]);
    });
});

describe("toPropertyInput", () => {
    it("round-trips a loaded listing back into a payload the schema accepts", () => {
        const parsed = listingFormSchema.safeParse(
            toPropertyInput(toListingDraft(property)),
        );

        expect(parsed.success).toBe(true);
    });

    it("sends a cleared optional measure as null so the column is emptied", () => {
        const input = toPropertyInput(draftOf({ sqFt: "" }));

        expect(input.sqFt).toBeNull();
    });

    it("trims surrounding whitespace from free-text fields", () => {
        const input = toPropertyInput(draftOf({ title: "  Beacon Hill  " }));

        expect(input.title).toBe("Beacon Hill");
    });

    it("falls back to the default country rather than sending an empty one", () => {
        const input = toPropertyInput(draftOf({ country: "  " }));

        expect(input.country).toBe("US");
    });

    it("leaves a non-numeric measure null rather than sending NaN", () => {
        const input = toPropertyInput(draftOf({ price: "not a price" }));

        expect(input.price).toBeNull();
    });
});

describe("changedFields", () => {
    it("sends nothing when the agent saves without editing anything", () => {
        const baseline = toListingDraft(property);
        const parsed = listingFormSchema.parse(toPropertyInput(baseline));

        expect(changedFields(parsed, baseline)).toEqual({});
    });

    it("sends only the field the agent actually edited", () => {
        const baseline = toListingDraft(property);
        const parsed = listingFormSchema.parse(
            toPropertyInput({ ...baseline, price: "5000000" }),
        );

        expect(changedFields(parsed, baseline)).toEqual({ price: 5_000_000 });
    });

    it("sends null for a measure the agent cleared, so the value can be removed", () => {
        const baseline = toListingDraft(property);
        const parsed = listingFormSchema.parse(
            toPropertyInput({ ...baseline, sqFt: "" }),
        );

        expect(changedFields(parsed, baseline)).toEqual({ sqFt: null });
    });

    it("sends a status change so a listing can be pulled back to draft", () => {
        const baseline = toListingDraft(property);
        const parsed = listingFormSchema.parse(
            toPropertyInput({ ...baseline, status: "DRAFT" }),
        );

        expect(changedFields(parsed, baseline)).toEqual({ status: "DRAFT" });
    });

    it("detects an edit inside a tag list rather than treating arrays as equal", () => {
        const baseline = toListingDraft(property);
        const parsed = listingFormSchema.parse(
            toPropertyInput({ ...baseline, amenities: ["Pool"] }),
        );

        expect(changedFields(parsed, baseline)).toEqual({
            amenities: ["Pool"],
        });
    });
});

describe("changedKeys", () => {
    it("names the edited fields so each form section can flag its own changes", () => {
        const baseline = toListingDraft(property);

        expect(
            changedKeys(
                { ...baseline, title: "New", walkScore: "80" },
                baseline,
            ),
        ).toEqual(["title", "walkScore"]);
    });
});

describe("movedImageIds", () => {
    const images = [
        { id: "a", url: "https://example.com/a.jpg", order: 0 },
        { id: "b", url: "https://example.com/b.jpg", order: 1 },
        { id: "c", url: "https://example.com/c.jpg", order: 2 },
    ];

    it("promotes an image to cover by moving it to the front", () => {
        expect(movedImageIds(images, 2, 0)).toEqual(["c", "a", "b"]);
    });

    it("swaps neighbours when an image steps one place later", () => {
        expect(movedImageIds(images, 0, 1)).toEqual(["b", "a", "c"]);
    });

    it("refuses a target outside the list instead of dropping an image", () => {
        expect(movedImageIds(images, 0, 3)).toEqual(["a", "b", "c"]);
    });
});
