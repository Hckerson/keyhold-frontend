"use client";

import { Container } from "@/components/ui/container";
import { ListingGallery } from "@/components/sections/listing/listing-gallery";
import { ListingPriceBar } from "@/components/sections/listing/listing-price-bar";
import { ListingDescription } from "@/components/sections/listing/listing-description";
import { ListingKeyFacts } from "@/components/sections/listing/listing-key-facts";
import { ListingDossier } from "@/components/sections/listing/listing-dossier";
import { ListingEnquiryCard } from "@/components/sections/listing/listing-enquiry-card";
import { ListingAgentCard } from "@/components/sections/listing/listing-agent-card";
import { ReportTrigger } from "@/components/features/shared/report-trigger";
import { ListingActionBar } from "@/components/sections/listing/listing-action-bar";
import {
    PROPERTY_STATUS_LABELS,
    PROPERTY_TYPE_LABELS,
} from "@/lib/enums/enums";
import { NEW_LISTING_DAYS } from "@/lib/constants";
import { usePropertyJourney } from "@/lib/hooks/use-property-journey";
import type { Listing } from "@/lib/types";

interface ListingDetailProps {
    listing: Listing;
    comparables: Listing[];
}

const HIGHLIGHT_COUNT = 4;

export function ListingDetail({ listing, comparables }: ListingDetailProps) {
    const { journey, actions, toggleSave, savePending } = usePropertyJourney(
        listing.id,
    );

    return (
        <>
            <Container className="flex-col gap-6 pt-6 pb-28 lg:pb-10">
                <ListingGallery
                    images={listing.images}
                    title={listing.title}
                    badge={
                        listing.listedDaysAgo <= NEW_LISTING_DAYS
                            ? "New listing"
                            : undefined
                    }
                />

                <ListingPriceBar
                    price={listing.price}
                    statusLabel={PROPERTY_STATUS_LABELS[listing.status]}
                    address={listing.address}
                    locality={listing.locality}
                    zipcode={listing.zipcode}
                    typeLabel={PROPERTY_TYPE_LABELS[listing.type]}
                    saved={journey.saved}
                    savePending={savePending}
                    onToggleSave={toggleSave}
                />

                <div className="detail-split gap-6">
                    <div className="detail-main flex flex-col gap-6">
                        <ListingKeyFacts listing={listing} />

                        <ListingDescription
                            description={listing.description}
                            highlights={listing.features.slice(
                                0,
                                HIGHLIGHT_COUNT,
                            )}
                        />

                        <ListingDossier
                            listing={listing}
                            comparables={comparables}
                        />
                    </div>

                    <aside
                        id="agent"
                        className="detail-rail scroll-hidden flex flex-col gap-4"
                    >
                        <ListingEnquiryCard
                            propertyId={listing.id}
                            address={listing.address}
                            listPrice={listing.price}
                            responseTime={listing.agent.responseTime}
                        />
                        <ListingAgentCard agent={listing.agent} />

                        <ReportTrigger
                            className="self-start"
                            targets={[
                                {
                                    type: "PROPERTY",
                                    id: listing.id,
                                    label: `This listing — ${listing.title}`,
                                },
                                {
                                    type: "USER",
                                    id: listing.agent.id,
                                    label: `The agent — ${listing.agent.name}`,
                                },
                            ]}
                        />
                    </aside>
                </div>
            </Container>

            <ListingActionBar
                price={listing.price}
                address={listing.address}
                saved={journey.saved}
                savePending={savePending}
                onToggleSave={toggleSave}
                action={actions.primary}
            />
        </>
    );
}

ListingDetail.displayName = "ListingDetail";
