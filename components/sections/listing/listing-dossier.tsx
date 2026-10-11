"use client";

import { type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListingFeatures } from "@/components/sections/listing/listing-features";
import { ListingNeighborhood } from "@/components/sections/listing/listing-neighborhood";
import { ListingComparables } from "@/components/sections/listing/listing-comparables";
import type { Listing } from "@/lib/types";

interface ListingDossierProps {
    listing: Listing;
    comparables: Listing[];
}

interface DossierTab {
    value: string;
    label: string;
    panel: ReactNode;
}

function buildTabs(listing: Listing, comparables: Listing[]): DossierTab[] {
    return [
        {
            value: "features",
            label: "Features",
            panel: <ListingFeatures features={listing.features} />,
        },
        {
            value: "neighborhood",
            label: "Neighborhood",
            panel: <ListingNeighborhood listing={listing} />,
        },
        {
            value: "comparables",
            label: "Comparables",
            panel: (
                <ListingComparables
                    listing={listing}
                    comparables={comparables}
                />
            ),
        },
    ];
}

export function ListingDossier({ listing, comparables }: ListingDossierProps) {
    const tabs = buildTabs(listing, comparables);

    return (
        <section className="border-border-light bg-background-alt rounded-xl border p-4 shadow-sm">
            <Tabs defaultValue={tabs[0].value}>
                <TabsList>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        {tab.panel}
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
}

ListingDossier.displayName = "ListingDossier";
