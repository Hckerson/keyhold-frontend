import {
    Bath,
    BedDouble,
    CalendarDays,
    LandPlot,
    Ruler,
    TrendingUp,
    type LucideIcon,
} from "lucide-react";
import { FactCell } from "@/components/sections/listing/fact-cell";
import { SectionEyebrow } from "@/components/patterns/section-eyebrow";

import type { Listing } from "@/lib/types";
import { formatCount, formatUsd } from "@/lib/utils/format";
const SQFT_PER_ACRE = 43560;

interface KeyFact {
    icon: LucideIcon;
    label: string;
    value: string;
}

function buildKeyFacts(listing: Listing): KeyFact[] {
    return [
        { icon: BedDouble, label: "Beds", value: String(listing.beds) },
        { icon: Bath, label: "Baths", value: String(listing.baths) },
        { icon: Ruler, label: "Sq ft", value: formatCount(listing.sqft) },
        {
            icon: LandPlot,
            label: "Lot size",
            value: listing.lotSqft
                ? `${(listing.lotSqft / SQFT_PER_ACRE).toFixed(2)} ac`
                : "—",
        },
        {
            icon: CalendarDays,
            label: "Built",
            value: String(listing.yearBuilt),
        },
        {
            icon: TrendingUp,
            label: "$ / sq ft",
            value: formatUsd(listing.pricePerSqft),
        },
    ];
}

export function ListingKeyFacts({ listing }: { listing: Listing }) {
    return (
        <section aria-label="Key facts" className="flex flex-col gap-3">
            <SectionEyebrow tone="muted">Key facts</SectionEyebrow>
            <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {buildKeyFacts(listing).map((fact) => (
                    <FactCell
                        key={fact.label}
                        label={fact.label}
                        value={fact.value}
                        icon={fact.icon}
                    />
                ))}
            </dl>
        </section>
    );
}

ListingKeyFacts.displayName = "ListingKeyFacts";
