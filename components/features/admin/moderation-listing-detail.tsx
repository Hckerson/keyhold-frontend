import { Callout } from "@/components/ui/callout";
import { Image } from "@/components/ui/image";
import { AgentContact } from "@/components/features/admin/agent-contact";
import { ComplianceList } from "@/components/features/admin/compliance-list";
import type { ModerationListing } from "@/lib/data/admin-listings";
import { formatMillions } from "@/lib/utils";

export interface ModerationListingDetailProps {
    listing: ModerationListing;
}

export function ModerationListingDetail({
    listing,
}: ModerationListingDetailProps) {
    return (
        <div className="space-y-4">
            <div className="bg-background-alt rounded-lg px-3 py-2.5">
                <p className="micro-label">Asking price</p>
                <p className="font-display text-h6 text-text mt-0.5 font-light tabular-nums">
                    {formatMillions(listing.price, 2)}
                </p>
                <p className="text-text-muted mt-1 text-xs tabular-nums">
                    Submitted {listing.submittedDate}
                </p>
            </div>

            {listing.reason && (
                <Callout
                    variant="error"
                    title="Flagged reason"
                    description={listing.reason}
                />
            )}

            {listing.note && (
                <Callout
                    variant={listing.changesRequested ? "warning" : "error"}
                    title={
                        listing.changesRequested
                            ? "Changes requested"
                            : "Rejection reason"
                    }
                    description={listing.note}
                />
            )}

            <div>
                <p className="micro-label">Photos · {listing.images.length}</p>
                <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                    {listing.images.map((src, index) => (
                        <Image
                            key={src}
                            src={src}
                            alt={`${listing.address} photo ${index + 1}`}
                            loading="lazy"
                            className="border-border-light border"
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="micro-label">Description</p>
                <p className="text-text-secondary mt-1.5 text-xs leading-relaxed">
                    {listing.description}
                </p>
            </div>

            <div>
                <p className="micro-label">Compliance</p>
                <ComplianceList checks={listing.compliance} />
            </div>

            <div>
                <p className="micro-label">Submitting agent</p>
                <AgentContact agent={listing.agent} />
            </div>
        </div>
    );
}

ModerationListingDetail.displayName = "ModerationListingDetail";
