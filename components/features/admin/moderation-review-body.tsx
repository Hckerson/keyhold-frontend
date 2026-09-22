import { Callout } from "@/components/ui/callout";
import { ModalBody } from "@/components/ui/modal";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import { ComplianceCheckList } from "@/components/features/admin/compliance-check-list";
import { ModerationAgentContact } from "@/components/features/admin/moderation-agent-contact";
import { ModerationPhotoStrip } from "@/components/features/admin/moderation-photo-strip";
import { ModerationReviewMetrics } from "@/components/features/admin/moderation-review-metrics";
import { MODERATION_STATUSES } from "@/lib/config/moderation-tones";
import type { ModerationListing } from "@/lib/types";

const PHOTOS_LABEL = "Photos";
const DESCRIPTION_LABEL = "Description";
const CHECKS_LABEL = "Compliance checks";
const AGENT_LABEL = "Submitting agent";

export interface ModerationReviewBodyProps {
    listing: ModerationListing;
}

export function ModerationReviewBody({ listing }: ModerationReviewBodyProps) {
    const status = MODERATION_STATUSES[listing.status];

    return (
        <ModalBody className="scroll-y max-h-[60vh] space-y-4">
            <ModerationReviewMetrics listing={listing} />

            {listing.note && (
                <Callout
                    variant={status.noteTone}
                    title={status.noteTitle}
                    description={listing.note}
                />
            )}

            <LabelledBlock label={`${PHOTOS_LABEL} · ${listing.photos.length}`}>
                <ModerationPhotoStrip
                    photos={listing.photos}
                    address={listing.address}
                />
            </LabelledBlock>

            <LabelledBlock label={DESCRIPTION_LABEL}>
                <p className="text-text-secondary text-xs leading-relaxed">
                    {listing.description}
                </p>
            </LabelledBlock>

            <LabelledBlock label={CHECKS_LABEL}>
                <ComplianceCheckList compliance={listing.compliance} />
            </LabelledBlock>

            <LabelledBlock label={AGENT_LABEL}>
                <ModerationAgentContact agent={listing.agent} />
            </LabelledBlock>
        </ModalBody>
    );
}

ModerationReviewBody.displayName = "ModerationReviewBody";
