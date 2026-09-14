export const IDENTITY_DOCUMENT_TYPES = [
    { value: "Passport", label: "Passport" },
    { value: "Driver's licence", label: "Driver's licence" },
    { value: "National ID card", label: "National ID card" },
    { value: "Residence permit", label: "Residence permit" },
] as const;

export type IdentityDocumentType =
    (typeof IDENTITY_DOCUMENT_TYPES)[number]["value"];

export const IDENTITY_ACCEPT =
    "image/jpeg,image/png,image/webp,application/pdf";
export const IDENTITY_MAX_BYTES = 10 * 1024 * 1024;

export const IDENTITY_COPY = {
    title: "Identity Verification",
    lede: "A government document, checked by a person before your account is marked verified",
    typeLabel: "Document type",
    numberLabel: "Document number",
    numberPlaceholder: "As printed on the document",
    countryLabel: "Issuing country",
    countryPlaceholder: "Country that issued it",
    documentLabel: "Document image",
    documentHint: "A clear photo or scan. JPG, PNG, WebP or PDF, up to 10MB.",
    faceLabel: "Selfie (optional)",
    faceHint: "Speeds up review by letting a reviewer match the photo.",
    submit: "Submit for review",
    pendingTitle: "In review",
    pendingLede:
        "A reviewer has your document. This usually takes one working day.",
    verifiedTitle: "Verified",
    verifiedLede: "Your identity is confirmed. Nothing further is needed.",
    rejectedTitle: "Not accepted",
    resubmit: "Submit a new document",
    missingDocument: "Attach the document image before submitting.",
} as const;
