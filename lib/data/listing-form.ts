import {
    EMPTY_LISTING_DRAFT,
    LISTING_TAG_SEPARATOR,
    type ListingDraft,
} from "@/lib/config/listing-form";
import type { CreatePropertyInput, Property } from "@/lib/validations/property";

const numberOr = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : undefined;
};

const tagList = (value: string) =>
    value
        .split(LISTING_TAG_SEPARATOR)
        .map((entry) => entry.trim())
        .filter(Boolean);

const tagText = (values: string[]) => values.join(`${LISTING_TAG_SEPARATOR} `);

export const toListingDraft = (property: Property): ListingDraft => ({
    title: property.title,
    description: property.description,
    address: property.address,
    locality: property.locality,
    region: property.region,
    postalCode: property.postalCode,
    price: String(property.price),
    bedrooms: String(property.bedrooms),
    bathrooms: String(property.bathrooms),
    sqFt: property.sqFt === null ? "" : String(property.sqFt),
    lotSqFt: property.lotSqFt === null ? "" : String(property.lotSqFt),
    yearBuilt: property.yearBuilt === null ? "" : String(property.yearBuilt),
    type: property.type,
    amenities: tagText(property.amenities),
    features: tagText(property.features),
});

export const toPropertyInput = (
    draft: ListingDraft,
): Record<string, unknown> => ({
    title: draft.title.trim(),
    description: draft.description.trim(),
    address: draft.address.trim(),
    locality: draft.locality.trim(),
    region: draft.region.trim(),
    postalCode: draft.postalCode.trim(),
    price: numberOr(draft.price),
    bedrooms: numberOr(draft.bedrooms),
    bathrooms: numberOr(draft.bathrooms),
    sqFt: numberOr(draft.sqFt),
    lotSqFt: numberOr(draft.lotSqFt),
    yearBuilt: numberOr(draft.yearBuilt),
    type: draft.type,
    amenities: tagList(draft.amenities),
    features: tagList(draft.features),
});

export const changedFields = (
    input: CreatePropertyInput,
    baseline: ListingDraft,
): Partial<CreatePropertyInput> => {
    const original = toPropertyInput(baseline);
    return Object.fromEntries(
        Object.entries(input).filter(
            ([key, value]) =>
                JSON.stringify(value) !== JSON.stringify(original[key]),
        ),
    );
};

export const isListingDraftDirty = (
    draft: ListingDraft,
    baseline: ListingDraft = EMPTY_LISTING_DRAFT,
) => JSON.stringify(draft) !== JSON.stringify(baseline);
