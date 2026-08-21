import { z } from "zod";
import {
    USER_ACCOUNT_STATUSES,
    USER_ROLES,
    VERIFICATION_STATUSES,
} from "@/lib/enums/enums";
import { pageOf, pageQuerySchema } from "@/lib/validations/pagination";

export const kycApplicantSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    phoneNumber: z.string().nullable(),
    avatar: z.string().nullable(),
    role: z.enum(USER_ROLES),
    status: z.enum(USER_ACCOUNT_STATUSES),
    agencyName: z.string().nullable(),
    licenseNumber: z.string().nullable(),
    kycVerified: z.boolean(),
    kycRejected: z.boolean(),
    createdAt: z.iso.datetime(),
});

export const identityDocumentSchema = z.object({
    id: z.string(),
    documentType: z.string(),
    documentNumber: z.string(),
    issuerCountry: z.string(),
    documentImageUrl: z.string(),
    faceImageUrl: z.string().nullable(),
    status: z.enum(VERIFICATION_STATUSES),
    rejectionReason: z.string().nullable(),
    userId: z.string(),
    user: kycApplicantSchema.optional(),
    verifiedAt: z.iso.datetime().nullable(),
    expiresAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const identityDocumentPageSchema = pageOf(identityDocumentSchema);

export const kycCountsSchema = z.object({
    pending: z.number().int(),
    verified: z.number().int(),
    rejected: z.number().int(),
    total: z.number().int(),
    oldestPendingAt: z.iso.datetime().nullable(),
});

export const submitKycSchema = z.object({
    documentType: z.string().min(2, "Pick a document type"),
    documentNumber: z.string().min(2, "Enter the document number"),
    issuerCountry: z.string().min(2, "Enter the issuing country"),
});

export const rejectKycSchema = z.object({
    rejectionReason: z
        .string()
        .min(4, "Give a reason of at least four characters"),
});

export const kycQuerySchema = pageQuerySchema.extend({
    status: z.enum(VERIFICATION_STATUSES).optional(),
});

export type KycApplicant = z.infer<typeof kycApplicantSchema>;
export type IdentityDocument = z.infer<typeof identityDocumentSchema>;
export type IdentityDocumentPage = z.infer<typeof identityDocumentPageSchema>;
export type KycCounts = z.infer<typeof kycCountsSchema>;
export type SubmitKycInput = z.infer<typeof submitKycSchema>;
export type RejectKycInput = z.infer<typeof rejectKycSchema>;
export type KycQuery = z.infer<typeof kycQuerySchema>;
