import {
    DEFAULT_COUNTRY,
    LISTING_STATUS_OPTIONS,
    isSellerStatus,
    type ListingDraft,
} from "@/lib/config/listing-form";
import { LISTING_FORM_COPY } from "@/lib/config/listing-form-copy";
import { FEATURED_DATE_FORMAT } from "@/lib/data/agent-listings";
import { PROPERTY_STATUS_LABELS, type PropertyStatus } from "@/lib/enums/enums";
import { dateFormatter } from "@/lib/utils";
import type {
    ListingFormInput,
    Property,
    PropertyImage,
    UpdatePropertyInput,
} from "@/lib/validations/property";

const asRecord = (draft: ListingDraft): Record<string, unknown> => ({
    ...draft,
});

const numberOrNull = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
};

const textOf = (value: number | null | undefined) =>
    value === null || value === undefined ? "" : String(value);

export const toListingDraft = (property: Property): ListingDraft => ({
    title: property.title,
    description: property.description,
    address: property.address,
    locality: property.locality,
    region: property.region,
    postalCode: property.postalCode,
    country: property.country,
    latitude: textOf(property.latitude),
    longitude: textOf(property.longitude),
    price: String(property.price),
    bedrooms: String(property.bedrooms),
    bathrooms: String(property.bathrooms),
    sqFt: textOf(property.sqFt),
    lotSqFt: textOf(property.lotSqFt),
    yearBuilt: textOf(property.yearBuilt),
    walkScore: textOf(property.walkScore),
    type: property.type,
    status: property.status,
    amenities: property.amenities,
    features: property.features,
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
    country: draft.country.trim() || DEFAULT_COUNTRY,
    latitude: numberOrNull(draft.latitude),
    longitude: numberOrNull(draft.longitude),
    price: numberOrNull(draft.price),
    bedrooms: numberOrNull(draft.bedrooms),
    bathrooms: numberOrNull(draft.bathrooms),
    sqFt: numberOrNull(draft.sqFt),
    lotSqFt: numberOrNull(draft.lotSqFt),
    yearBuilt: numberOrNull(draft.yearBuilt),
    walkScore: numberOrNull(draft.walkScore),
    type: draft.type,
    status: draft.status,
    amenities: draft.amenities,
    features: draft.features,
});

export const changedFields = (
    input: ListingFormInput,
    baseline: ListingDraft,
): UpdatePropertyInput => {
    const previous = toPropertyInput(baseline);
    return Object.fromEntries(
        Object.entries(input).filter(
            ([key, value]) =>
                JSON.stringify(value) !== JSON.stringify(previous[key]),
        ),
    );
};

export const changedKeys = (draft: ListingDraft, baseline: ListingDraft) => {
    const previous = asRecord(baseline);
    return Object.entries(asRecord(draft))
        .filter(
            ([key, value]) =>
                JSON.stringify(value) !== JSON.stringify(previous[key]),
        )
        .map(([key]) => key);
};

export const featuredLabel = (property: Property) =>
    property.featuredUntil && new Date(property.featuredUntil) > new Date()
        ? dateFormatter(property.featuredUntil, FEATURED_DATE_FORMAT)
        : undefined;

export const dirtySummary = (count: number) => {
    if (count === 0) return LISTING_FORM_COPY.clean;
    if (count === 1) return LISTING_FORM_COPY.dirtyOne;
    return `${count} ${LISTING_FORM_COPY.dirtyMany}`;
};

export const movedImageIds = (
    images: readonly PropertyImage[],
    from: number,
    to: number,
) => {
    const ids = images.map((image) => image.id);
    const moving = ids[from];
    if (moving === undefined || to < 0 || to >= ids.length) return ids;
    const without = ids.filter((_, index) => index !== from);
    return [...without.slice(0, to), moving, ...without.slice(to)];
};

export const listingStatusOptions = (status: PropertyStatus) =>
    isSellerStatus(status)
        ? LISTING_STATUS_OPTIONS
        : [
              { value: status, label: PROPERTY_STATUS_LABELS[status] },
              ...LISTING_STATUS_OPTIONS,
          ];

const SELLABLE_STATUSES: readonly PropertyStatus[] = ["AVAILABLE", "PENDING"];

export const canMarkSold = (status: PropertyStatus) =>
    SELLABLE_STATUSES.includes(status);
