import { GraduationCap } from "lucide-react";
import { FactCell } from "@/components/sections/listing/fact-cell";
import { SectionEyebrow } from "@/components/patterns/section-heading";

import type { Listing } from "@/lib/types";
interface AreaStat {
    label: string;
    value: string;
}

function buildAreaStats(listing: Listing): AreaStat[] {
    return [
        { label: "Walk score", value: String(listing.walkScore) },
        { label: "Days on market", value: String(listing.listedDaysAgo) },
        { label: "Saves", value: listing.saves.toLocaleString() },
    ];
}

export function ListingNeighborhood({ listing }: { listing: Listing }) {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-text-secondary max-w-[54ch] text-xs leading-relaxed">
                {listing.locality} at a glance. Your agent can walk the
                immediate area with you and open any property on the street by
                private appointment.
            </p>

            <dl className="grid grid-cols-3 gap-2">
                {buildAreaStats(listing).map((stat) => (
                    <FactCell
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                    />
                ))}
            </dl>

            <div className="border-border flex items-start gap-2 border-t pt-3">
                <GraduationCap
                    className="text-highlight-dark mt-0.5 size-3 shrink-0"
                    strokeWidth={1.5}
                />
                <div className="flex flex-col gap-0.5">
                    <SectionEyebrow tone="muted">Schools</SectionEyebrow>
                    <p className="text-text text-xs">
                        Catchment and private school detail is released with the
                        full dossier.
                    </p>
                </div>
            </div>
        </div>
    );
}

ListingNeighborhood.displayName = "ListingNeighborhood";
