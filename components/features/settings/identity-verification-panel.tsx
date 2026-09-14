"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Panel } from "@/components/ui/panel";
import { IdentitySubmitForm } from "@/components/features/settings/identity-submit-form";
import { IDENTITY_COPY } from "@/lib/config/identity-verification";
import { useIdentityVerification } from "@/lib/hooks/use-identity-verification";

export function IdentityVerificationPanel() {
    const identity = useIdentityVerification();
    const { latest } = identity;

    const showForm =
        !latest || (latest.status === "REJECTED" && identity.resubmitting);

    return (
        <Panel title={IDENTITY_COPY.title} description={IDENTITY_COPY.lede}>
            <div className="flex flex-col gap-3">
                {latest?.status === "VERIFIED" && (
                    <Callout
                        variant="success"
                        title={IDENTITY_COPY.verifiedTitle}
                        description={IDENTITY_COPY.verifiedLede}
                    />
                )}

                {latest?.status === "PENDING" && (
                    <Callout
                        variant="info"
                        title={IDENTITY_COPY.pendingTitle}
                        description={IDENTITY_COPY.pendingLede}
                    />
                )}

                {latest?.status === "REJECTED" && (
                    <Callout
                        variant="error"
                        title={IDENTITY_COPY.rejectedTitle}
                        description={latest.rejectionReason ?? undefined}
                    />
                )}

                {latest?.status === "REJECTED" && !identity.resubmitting && (
                    <Button
                        type="button"
                        emphasis="outline"
                        tone="accent"
                        className="self-start"
                        onClick={identity.startResubmit}
                    >
                        {IDENTITY_COPY.resubmit}
                    </Button>
                )}

                {showForm && (
                    <IdentitySubmitForm
                        documentType={identity.documentType}
                        documentNumber={identity.documentNumber}
                        issuerCountry={identity.issuerCountry}
                        document={identity.document}
                        face={identity.face}
                        complete={identity.complete}
                        sending={identity.sending}
                        onDocumentTypeChange={identity.setDocumentType}
                        onDocumentNumberChange={identity.setDocumentNumber}
                        onIssuerCountryChange={identity.setIssuerCountry}
                        onDocumentChange={identity.setDocument}
                        onFaceChange={identity.setFace}
                        onSubmit={identity.send}
                    />
                )}
            </div>
        </Panel>
    );
}

IdentityVerificationPanel.displayName = "IdentityVerificationPanel";
