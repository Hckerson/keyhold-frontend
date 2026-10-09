import { VerificationFrame } from "@/components/features/admin/verification-frame";
import { VERIFICATION_COPY } from "@/lib/data/admin-verifications";
import type { VerificationRequest } from "@/lib/types";

export interface VerificationEvidenceProps {
    request: VerificationRequest;
}

export function VerificationEvidence({ request }: VerificationEvidenceProps) {
    return (
        <div className="grid gap-3 @md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <VerificationFrame
                label={VERIFICATION_COPY.documentFrame}
                url={request.documentUrl}
                alt={`${request.documentType} submitted by ${request.name}`}
                sizes="(min-width: 64rem) 40vw, 90vw"
            />
            <VerificationFrame
                label={VERIFICATION_COPY.faceFrame}
                url={request.faceUrl}
                alt={`Selfie submitted by ${request.name}`}
                sizes="(min-width: 64rem) 20vw, 90vw"
                ratio="@md:aspect-[4/5]"
            />
        </div>
    );
}

VerificationEvidence.displayName = "VerificationEvidence";
