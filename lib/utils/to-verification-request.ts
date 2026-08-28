import type {
    VerificationDocument,
    VerificationRequest,
} from "@/lib/data/admin-verifications";
import type { IdentityDocument } from "@/lib/validations/kyc";
import { daysSince } from "@/lib/utils/elapsed";

const NO_AGENCY = "Independent";
const NO_PHONE = "—";

const documentsOf = (document: IdentityDocument): VerificationDocument[] => [
    {
        label: document.documentType,
        detail: `No. ${document.documentNumber} · ${document.issuerCountry}`,
        state: document.status === "REJECTED" ? "missing" : "review",
        url: document.documentImageUrl,
    },
    {
        label: "Face capture",
        detail: document.faceImageUrl
            ? "Submitted alongside the document"
            : "Not provided",
        state: document.faceImageUrl ? "review" : "missing",
        url: document.faceImageUrl,
    },
];

export const toVerificationRequest = (
    document: IdentityDocument,
): VerificationRequest => ({
    id: document.id,
    userId: document.userId,
    name: document.user?.fullName ?? "",
    email: document.user?.email ?? "",
    phone: document.user?.phoneNumber ?? NO_PHONE,
    agency: document.user?.agencyName ?? NO_AGENCY,
    documentType: document.documentType,
    documentNumber: document.documentNumber,
    issuerCountry: document.issuerCountry,
    status: document.status,
    submittedDate: document.createdAt,
    waitingDays: daysSince(document.createdAt),
    memberSince: document.user?.createdAt ?? document.createdAt,
    documents: documentsOf(document),
    note: document.rejectionReason ?? undefined,
    noteKind: document.rejectionReason ? "reject" : undefined,
});

export const toVerificationQueue = (
    documents: IdentityDocument[],
): VerificationRequest[] => documents.map(toVerificationRequest);
