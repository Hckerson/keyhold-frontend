import {
    LISTABLE_TYPE_OPTIONS,
    PRICE_BANDS,
    type FilterOption,
} from "@/lib/config/search-filters";
import type { SelectOption } from "@/lib/types";

export const HERO_ANY_VALUE = "";

const withAnyOption = (
    anyLabel: string,
    options: FilterOption[],
): SelectOption<string>[] => [
    { value: HERO_ANY_VALUE, label: anyLabel },
    ...options.map(({ id, label }) => ({ value: id, label })),
];

export const HERO_TYPE_OPTIONS = withAnyOption(
    "Any type",
    LISTABLE_TYPE_OPTIONS,
);

export const HERO_PRICE_OPTIONS = withAnyOption("Any price", PRICE_BANDS);
