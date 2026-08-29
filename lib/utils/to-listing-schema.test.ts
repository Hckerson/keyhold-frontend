import { describe, expect, it } from "vitest";
import {
    serialiseSchema,
    toListingSchema,
} from "@/lib/utils/to-listing-schema";
import type { Property } from "@/lib/validations/property";

const aProperty = (overrides: Partial<Property> = {}): Property => ({
    id: "prop_1",
    title: "Cypress Point",
    description: "A cliffside estate above Carmel Bay.",
    address: "18 Cypress Point",
    locality: "Carmel",
    region: "California",
    postalCode: "93923",
    country: "US",
    latitude: 36.5552,
    longitude: -121.9233,
    price: 1_250_000,
    bedrooms: 4,
    bathrooms: 3,
    sqFt: 4200,
    lotSqFt: null,
    yearBuilt: 1998,
    walkScore: null,
    viewsCount: 0,
    amenities: [],
    features: [],
    type: "HOUSE",
    status: "AVAILABLE",
    sellerId: "usr_seller",
    images: [{ id: "img_1", url: "https://cdn.example.com/1.jpg", order: 0 }],
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-02T00:00:00.000Z",
    ...overrides,
});

describe("toListingSchema", () => {
    it("marks the document as a RealEstateListing search engines recognise", () => {
        const schema = toListingSchema(aProperty());

        expect(schema["@context"]).toBe("https://schema.org");
        expect(schema["@type"]).toBe("RealEstateListing");
    });

    it("carries the price as an offer, not as loose text", () => {
        const { offers } = toListingSchema(aProperty());

        expect(offers).toEqual({
            "@type": "Offer",
            price: 1_250_000,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        });
    });

    it("reports a sold property as unavailable", () => {
        const { offers } = toListingSchema(aProperty({ status: "SOLD" }));

        expect(offers.availability).toBe("https://schema.org/SoldOut");
    });

    it("splits the address into its postal parts", () => {
        const { address } = toListingSchema(aProperty());

        expect(address).toEqual({
            "@type": "PostalAddress",
            streetAddress: "18 Cypress Point",
            addressLocality: "Carmel",
            addressRegion: "California",
            postalCode: "93923",
            addressCountry: "US",
        });
    });

    it("omits optional blocks rather than emitting nulls", () => {
        const schema = toListingSchema(
            aProperty({
                sqFt: null,
                yearBuilt: null,
                latitude: null,
                longitude: null,
                images: [],
            }),
        );

        expect(schema).not.toHaveProperty("floorSize");
        expect(schema).not.toHaveProperty("yearBuilt");
        expect(schema).not.toHaveProperty("geo");
        expect(schema).not.toHaveProperty("image");
    });

    it("omits geo unless both coordinates are present", () => {
        const schema = toListingSchema(aProperty({ longitude: null }));

        expect(schema).not.toHaveProperty("geo");
    });
});

describe("serialiseSchema", () => {
    it("escapes a closing script tag hidden in seller-supplied text", () => {
        const serialised = serialiseSchema(
            toListingSchema(
                aProperty({
                    description: "Lovely</script><script>alert(1)</script>",
                }),
            ),
        );

        expect(serialised).not.toContain("</script>");
        expect(serialised).toContain("\\u003c/script");
    });

    it("stays parseable once escaped", () => {
        const serialised = serialiseSchema(
            toListingSchema(aProperty({ title: "A <b>bold</b> estate" })),
        );

        expect(JSON.parse(serialised)).toMatchObject({
            name: "A <b>bold</b> estate",
        });
    });
});
