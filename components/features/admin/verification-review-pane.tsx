"use client";

import { Avatar } from "@/components/ui/avatar";
import { Callout } from "@/components/ui/callout";
import { StatusBadge } from "@/components/ui/status-badge";
import { VerificationContactLinks } from "@/components/features/admin/verification-contact-links";
import { VerificationDecisionBar } from "@/components/features/admin/verification-decision-bar";
import { VerificationDocumentList } from "@/components/features/admin/verification-document-list";
import { SignalGrid, type Signal } from "@/components/patterns/signal-grid";
import {
    noteMeta,
    statusMeta,
    type VerificationActionMode,
    type VerificationRequest,
} from "@/lib/data/admin-verifications";
import { initialsOf } from "@/lib/utils";

export interface VerificationReviewPaneProps {
    request: VerificationRequest;
    approving: boolean;
    busy: boolean;
    onAction: (mode: VerificationActionMode) => void;
}

export function VerificationReviewPane({
    request,
    approving,
    busy,
    onAction,
}: VerificationReviewPaneProps) {
    const meta = statusMeta[request.status];
    const note = request.noteKind ? noteMeta[request.noteKind] : null;

    const signals: Signal[] = [
        { label: "Document", value: request.documentType },
        { label: "Number", value: request.documentNumber },
        { label: "Issuer", value: request.issuerCountry },
        { label: "Waiting", value: `${request.waitingDays}d` },
    ];

    return (
        <section className="bg-background-muted border-border-light overflow-hidden rounded-xl border shadow-sm">
            <div className="border-border-light flex items-start justify-between gap-3 border-b px-4 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                    <Avatar
                        size="sm"
                        tone="accent"
                        elevated={false}
                        initials={initialsOf(request.name)}
                    />
                    <div className="min-w-0">
                        <h2 className="text-text truncate text-xs font-semibold">
                            {request.name}
                        </h2>
                        <p className="text-text-muted truncate text-xs">
                            {request.agency}
                        </p>
                    </div>
                </div>
                <StatusBadge tone={meta.tone} size="md">
                    {meta.label}
                </StatusBadge>
            </div>

            <div className="flex flex-col gap-4 px-4 py-3">
                <SignalGrid signals={signals} />

                {note && request.note && (
                    <Callout
                        variant={note.variant}
                        title={note.title}
                        description={request.note}
                    />
                )}

                <div>
                    <p className="micro-label">
                        Documents · {request.documents.length}
                    </p>
                    <VerificationDocumentList documents={request.documents} />
                </div>

                <div>
                    <p className="micro-label mb-1.5">Contact</p>
                    <VerificationContactLinks
                        email={request.email}
                        phone={request.phone}
                    />
                </div>
            </div>

            <VerificationDecisionBar
                status={request.status}
                approving={approving}
                busy={busy}
                onAction={onAction}
            />
        </section>
    );
}

VerificationReviewPane.displayName = "VerificationReviewPane";
