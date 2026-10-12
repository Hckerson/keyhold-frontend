import type { VerificationRequest } from "@/lib/types";
import type { IdentityDocument } from "@/lib/validations/kyc";

export const VERIFICATION_TODAY = new Date("2026-10-09T12:00:00Z");

export const aVerification = (
    overrides: Partial<VerificationRequest> = {},
): VerificationRequest => ({
    id: "kyc-1",
    userId: "user-1",
    name: "Irwin Lindgren",
    email: "irwin@example.com",
    phone: "+13105551015",
    role: "Agent",
    agency: "Harbor & Vine",
    licence: "CA-01234567",
    documentType: "Passport",
    documentNumber: "KH-100703",
    issuer: "United States",
    status: "PENDING",
    submittedAt: "2026-09-29T12:00:00Z",
    decidedAt: null,
    expiresAt: "2030-09-29T12:00:00Z",
    memberSince: "2025-03-01T12:00:00Z",
    documentUrl: "https://res.cloudinary.com/demo/document.jpg",
    faceUrl: null,
    reason: null,
    ...overrides,
});

export const anIdentityDocument = (
    overrides: Partial<IdentityDocument> = {},
): IdentityDocument => ({
    id: "kyc-1",
    documentType: "DRIVERS_LICENSE",
    documentNumber: "KH-100703",
    issuerCountry: "US",
    documentImageUrl: "https://res.cloudinary.com/demo/document.jpg",
    faceImageUrl: null,
    status: "PENDING",
    rejectionReason: null,
    userId: "user-1",
    user: {
        id: "user-1",
        fullName: "Irwin Lindgren",
        email: "irwin@example.com",
        phoneNumber: null,
        avatar: null,
        role: "SELLER",
        status: "ACTIVE",
        agencyName: null,
        licenseNumber: "CA-01234567",
        kycVerified: false,
        kycRejected: false,
        createdAt: "2025-03-01T12:00:00.000Z",
    },
    verifiedAt: null,
    expiresAt: null,
    createdAt: "2026-09-29T12:00:00.000Z",
    updatedAt: "2026-09-30T12:00:00.000Z",
    ...overrides,
});
