"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusDot } from "@/components/patterns/status-dot";
import { SectionEyebrow } from "@/components/patterns/section-heading";
import { MakeOfferModal } from "@/components/features/listings/make-offer-modal";
import { RequestViewingModal } from "@/components/features/listings/request-viewing-modal";
import { ListingJourneyAction } from "@/components/sections/listing/listing-journey-action";
import { PROPERTY_STAGES } from "@/lib/config/property-journey";
import { usePropertyJourney } from "@/lib/hooks/use-property-journey";
import type { PropertyActionKind } from "@/lib/types";

const VERIFIED = "Verified listing · identity and title checked";
const CARD_LABEL = "Your standing on this residence";

export interface ListingEnquiryCardProps {
    propertyId: string;
    address: string;
    listPrice: number;
    responseTime: string;
}

export function ListingEnquiryCard({
    propertyId,
    address,
    listPrice,
    responseTime,
}: ListingEnquiryCardProps) {
    const flow = usePropertyJourney(propertyId);
    const [open, setOpen] = useState<PropertyActionKind | null>(null);

    const meta = PROPERTY_STAGES[flow.journey.stage];
    const StageIcon = meta.icon;

    const run = (kind: PropertyActionKind) => {
        if (kind === "interest") return flow.registerInterest();
        if (kind === "viewing" || kind === "offer") setOpen(kind);
    };

    return (
        <section
            aria-label={CARD_LABEL}
            className="border-border-dark bg-background-alt flex flex-col gap-3 rounded-xl border p-4 shadow-md"
        >
            {flow.settling ? (
                <Skeleton className="h-28 w-full rounded-lg" />
            ) : (
                <>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                            <StatusDot tone={meta.tone} />
                            <SectionEyebrow>{meta.label}</SectionEyebrow>
                        </div>
                        <p className="text-text-secondary flex gap-1.5 text-xs">
                            <StageIcon
                                className="text-text-muted mt-0.5 size-3 shrink-0"
                                strokeWidth={1.5}
                            />
                            {meta.note}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <ListingJourneyAction
                            action={flow.actions.primary}
                            variant="primary"
                            pending={flow.interestPending}
                            onRun={() => run(flow.actions.primary.kind)}
                        />
                        {flow.actions.secondary && (
                            <ListingJourneyAction
                                action={flow.actions.secondary}
                                variant="secondary"
                                onRun={() =>
                                    run(flow.actions.secondary?.kind ?? "none")
                                }
                            />
                        )}
                    </div>
                </>
            )}

            <div className="bg-background-muted border-border-light flex flex-col gap-1.5 rounded-md border p-2.5">
                <p className="text-text-muted flex items-center gap-1.5 text-xs">
                    <ShieldCheck
                        className="size-3 shrink-0"
                        strokeWidth={1.5}
                    />
                    {VERIFIED}
                </p>
                <p className="text-highlight-dark text-xs font-medium">
                    {responseTime}
                </p>
            </div>

            <RequestViewingModal
                open={open === "viewing"}
                address={address}
                pending={flow.viewingPending}
                failed={flow.viewingFailed}
                onClose={() => setOpen(null)}
                onSubmit={(draft) =>
                    void flow.bookViewing(draft).then((done) => {
                        if (done) setOpen(null);
                    })
                }
            />

            <MakeOfferModal
                open={open === "offer"}
                address={address}
                listPrice={listPrice}
                pending={flow.offerPending}
                failed={flow.offerFailed}
                onClose={() => setOpen(null)}
                onSubmit={(draft) =>
                    void flow.placeOffer(draft).then((done) => {
                        if (done) setOpen(null);
                    })
                }
            />
        </section>
    );
}

ListingEnquiryCard.displayName = "ListingEnquiryCard";
