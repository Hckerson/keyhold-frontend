import { IDENTITY_DOCUMENT_CODES } from "@/lib/config/identity-verification";
import { USER_ROLES } from "@/lib/config/user-tones";
import { formatRegion } from "@/lib/utils/format";
import { MANAGED_ROLE_BY_USER } from "@/lib/utils/to-user-segments";
import type { VerificationRequest } from "@/lib/types";
import type { IdentityDocument } from "@/lib/validations/kyc";

const decidedAt = (document: IdentityDocument) => {
    if (document.status === "VERIFIED")
        return document.verifiedAt ?? document.updatedAt;
    return document.status === "REJECTED" ? document.updatedAt : null;
};

export const toVerificationRequest = (
    document: IdentityDocument,
): VerificationRequest => {
    const user = document.user;

    return {
        id: document.id,
        userId: document.userId,
        name: user?.fullName ?? "",
        email: user?.email ?? "",
        phone: user?.phoneNumber ?? null,
        role: user ? USER_ROLES[MANAGED_ROLE_BY_USER[user.role]].label : null,
        agency: user?.agencyName ?? null,
        licence: user?.licenseNumber ?? null,
        documentType:
            IDENTITY_DOCUMENT_CODES[document.documentType] ??
            document.documentType,
        documentNumber: document.documentNumber,
        issuer: formatRegion(document.issuerCountry),
        status: document.status,
        submittedAt: document.createdAt,
        decidedAt: decidedAt(document),
        expiresAt: document.expiresAt,
        memberSince: user?.createdAt ?? document.createdAt,
        documentUrl: document.documentImageUrl,
        faceUrl: document.faceImageUrl,
        reason: document.rejectionReason,
    };
};

export const toVerificationQueue = (
    documents: IdentityDocument[],
): VerificationRequest[] => documents.map(toVerificationRequest);
