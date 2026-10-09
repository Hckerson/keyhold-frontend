import { VerificationFrame } from "@/components/features/admin/verification-frame";
import { VERIFICATION_COPY } from "@/lib/data/admin-verifications";
import type { VerificationRequest } from "@/lib/types";

const SIZES = "(min-width: 64rem) 30vw, 90vw";

export interface VerificationEvidenceProps {
    request: VerificationRequest;
}

export function VerificationEvidence({ request }: VerificationEvidenceProps) {
    return (
        <div className="flex min-w-0 flex-col gap-3">
            <VerificationFrame
                label={VERIFICATION_COPY.documentFrame}
                url={request.documentUrl}
                alt={`${request.documentType} submitted by ${request.name}`}
                sizes={SIZES}
            />
            <VerificationFrame
                label={VERIFICATION_COPY.faceFrame}
                url={request.faceUrl}
                alt={`Selfie submitted by ${request.name}`}
                sizes={SIZES}
            />
        </div>
    );
}

VerificationEvidence.displayName = "VerificationEvidence";
