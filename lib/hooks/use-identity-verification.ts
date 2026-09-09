"use client";

import { useMemo, useState } from "react";
import {
    IDENTITY_DOCUMENT_TYPES,
    type IdentityDocumentType,
} from "@/lib/config/identity-verification";
import { useMyDocuments, useSubmitKyc } from "@/lib/hooks/use-kyc";

const STATUS_RANK = { PENDING: 2, REJECTED: 1, VERIFIED: 3 } as const;

export function useIdentityVerification(enabled = true) {
    const documents = useMyDocuments(enabled);
    const submit = useSubmitKyc();

    const [documentType, setDocumentType] = useState<IdentityDocumentType>(
        IDENTITY_DOCUMENT_TYPES[0].value,
    );
    const [documentNumber, setDocumentNumber] = useState("");
    const [issuerCountry, setIssuerCountry] = useState("");
    const [document, setDocument] = useState<File | null>(null);
    const [face, setFace] = useState<File | null>(null);
    const [resubmitting, setResubmitting] = useState(false);

    const latest = useMemo(() => {
        const items = documents.data ?? [];
        return (
            [...items].sort(
                (a, b) =>
                    STATUS_RANK[b.status] - STATUS_RANK[a.status] ||
                    Date.parse(b.createdAt) - Date.parse(a.createdAt),
            )[0] ?? null
        );
    }, [documents.data]);

    const complete =
        documentNumber.trim().length > 1 &&
        issuerCountry.trim().length > 1 &&
        document !== null;

    const send = () => {
        if (!document || !complete) return;
        submit.mutate(
            {
                input: {
                    documentType,
                    documentNumber: documentNumber.trim(),
                    issuerCountry: issuerCountry.trim(),
                },
                document,
                face: face ?? undefined,
            },
            {
                onSuccess: () => {
                    setDocumentNumber("");
                    setIssuerCountry("");
                    setDocument(null);
                    setFace(null);
                    setResubmitting(false);
                },
            },
        );
    };

    return {
        latest,
        documentType,
        documentNumber,
        issuerCountry,
        document,
        face,
        complete,
        resubmitting,
        loading: documents.isPending,
        sending: submit.isPending,
        setDocumentType,
        setDocumentNumber,
        setIssuerCountry,
        setDocument,
        setFace,
        startResubmit: () => setResubmitting(true),
        send,
    };
}
