import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import type { ListingDraft } from "@/lib/config/listing-form";

export const LISTING_FORM_SECTIONS = [
    {
        id: "identity",
        label: COPY.identity,
        keys: ["title", "description", "type"],
        editOnly: false,
    },
    {
        id: "place",
        label: COPY.place,
        keys: [
            "address",
            "locality",
            "region",
            "postalCode",
            "country",
            "latitude",
            "longitude",
        ],
        editOnly: false,
    },
    {
        id: "specs",
        label: COPY.specs,
        keys: [
            "price",
            "bedrooms",
            "bathrooms",
            "sqFt",
            "lotSqFt",
            "yearBuilt",
            "walkScore",
        ],
        editOnly: false,
    },
    {
        id: "extras",
        label: COPY.extras,
        keys: ["amenities", "features"],
        editOnly: false,
    },
    { id: "media", label: COPY.media, keys: [], editOnly: true },
    {
        id: "lifecycle",
        label: COPY.lifecycle,
        keys: ["status"],
        editOnly: true,
    },
] as const satisfies readonly {
    id: string;
    label: string;
    keys: readonly (keyof ListingDraft)[];
    editOnly: boolean;
}[];
