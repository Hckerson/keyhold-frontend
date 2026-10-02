"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";
import { FileUpload } from "@/components/ui/forms/file-upload";
import { Select } from "@/components/ui/forms/select";
import {
    IDENTITY_ACCEPT,
    IDENTITY_COPY,
    IDENTITY_DOCUMENT_TYPES,
    IDENTITY_MAX_BYTES,
    type IdentityDocumentType,
} from "@/lib/config/identity-verification";

export interface IdentitySubmitFormProps {
    documentType: IdentityDocumentType;
    documentNumber: string;
    issuerCountry: string;
    document: File | null;
    face: File | null;
    complete: boolean;
    sending: boolean;
    onDocumentTypeChange: (value: IdentityDocumentType) => void;
    onDocumentNumberChange: (value: string) => void;
    onIssuerCountryChange: (value: string) => void;
    onDocumentChange: (file: File | null) => void;
    onFaceChange: (file: File | null) => void;
    onSubmit: () => void;
}

export function IdentitySubmitForm({
    documentType,
    documentNumber,
    issuerCountry,
    document,
    face,
    complete,
    sending,
    onDocumentTypeChange,
    onDocumentNumberChange,
    onIssuerCountryChange,
    onDocumentChange,
    onFaceChange,
    onSubmit,
}: IdentitySubmitFormProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="trio-grid gap-3">
                <Select
                    label={IDENTITY_COPY.typeLabel}
                    options={IDENTITY_DOCUMENT_TYPES}
                    value={documentType}
                    onChange={onDocumentTypeChange}
                />
                <FormField
                    name="documentNumber"
                    label={IDENTITY_COPY.numberLabel}
                    value={documentNumber}
                    placeholder={IDENTITY_COPY.numberPlaceholder}
                    onChange={(event) =>
                        onDocumentNumberChange(event.target.value)
                    }
                />
                <FormField
                    name="issuerCountry"
                    label={IDENTITY_COPY.countryLabel}
                    value={issuerCountry}
                    placeholder={IDENTITY_COPY.countryPlaceholder}
                    onChange={(event) =>
                        onIssuerCountryChange(event.target.value)
                    }
                />
            </div>

            <FileUpload
                id="identity-document"
                label={IDENTITY_COPY.documentLabel}
                hint={document ? document.name : IDENTITY_COPY.documentHint}
                accept={IDENTITY_ACCEPT}
                maxSize={IDENTITY_MAX_BYTES}
                disabled={sending}
                onFiles={(files) => onDocumentChange(files[0] ?? null)}
            />

            <FileUpload
                id="identity-face"
                label={IDENTITY_COPY.faceLabel}
                hint={face ? face.name : IDENTITY_COPY.faceHint}
                accept={IDENTITY_ACCEPT}
                maxSize={IDENTITY_MAX_BYTES}
                disabled={sending}
                onFiles={(files) => onFaceChange(files[0] ?? null)}
            />

            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    disabled={!complete}
                    isLoading={sending}
                    onClick={onSubmit}
                >
                    {IDENTITY_COPY.submit}
                </Button>
                {!document && (
                    <p className="text-text-muted text-xs">
                        {IDENTITY_COPY.missingDocument}
                    </p>
                )}
            </div>
        </div>
    );
}

IdentitySubmitForm.displayName = "IdentitySubmitForm";
