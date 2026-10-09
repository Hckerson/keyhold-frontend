import { z } from "zod";
import {
    DISPUTE_EVIDENCE_TYPES,
    DISPUTE_OUTCOMES,
    DISPUTE_STATUSES,
    TRANSACTION_STATUSES,
} from "@/lib/enums/enums";
import { pageOf, pageQuerySchema } from "@/lib/validations/pagination";
import { userSummarySchema } from "@/lib/validations/user";

export const disputeSummarySchema = z.object({
    id: z.string(),
    title: z.string(),
    status: z.enum(DISPUTE_STATUSES),
});

export const disputeEvidenceSchema = z.object({
    id: z.string(),
    type: z.enum(DISPUTE_EVIDENCE_TYPES),
    content: z.string(),
    label: z.string().nullable(),
    disputeId: z.string(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const disputedTransactionSchema = z.object({
    id: z.string(),
    finalPrice: z.number(),
    status: z.enum(TRANSACTION_STATUSES),
    escrowHoldId: z.string().nullable(),
    property: z.object({
        id: z.string(),
        title: z.string(),
        address: z.string(),
    }),
});

export const disputeSchema = disputeSummarySchema.extend({
    description: z.string(),
    resolutionNotes: z.string().nullable(),
    initiatorId: z.string(),
    initiator: userSummarySchema.optional(),
    evidence: z.array(disputeEvidenceSchema).default([]),
    transactions: z.array(disputedTransactionSchema).default([]),
    resolvedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const disputePageSchema = pageOf(disputeSchema);

export const disputeCountsSchema = z.object({
    byStatus: z.record(z.enum(DISPUTE_STATUSES), z.number().int()),
    oldestOpenAt: z.iso.datetime().nullable(),
});

export const createDisputeSchema = z.object({
    title: z.string().min(4, "Give the dispute a title"),
    description: z.string().min(10, "Describe what went wrong"),
    transactionId: z.string().optional(),
});

export const addEvidenceSchema = z.object({
    type: z.enum(DISPUTE_EVIDENCE_TYPES),
    content: z.string().min(1, "Attach a link or a note"),
    label: z.string().optional(),
});

export const resolveDisputeSchema = z.object({
    resolutionNotes: z
        .string()
        .min(4, "Explain the outcome in at least four characters"),
    outcome: z.enum(DISPUTE_OUTCOMES).optional(),
});

export const disputeQuerySchema = pageQuerySchema.extend({
    status: z.enum(DISPUTE_STATUSES).optional(),
});

export type DisputeSummary = z.infer<typeof disputeSummarySchema>;
export type DisputeEvidence = z.infer<typeof disputeEvidenceSchema>;
export type DisputedTransaction = z.infer<typeof disputedTransactionSchema>;
export type Dispute = z.infer<typeof disputeSchema>;
export type DisputePage = z.infer<typeof disputePageSchema>;
export type DisputeCounts = z.infer<typeof disputeCountsSchema>;
export type CreateDisputeInput = z.infer<typeof createDisputeSchema>;
export type AddEvidenceInput = z.infer<typeof addEvidenceSchema>;
export type ResolveDisputeInput = z.infer<typeof resolveDisputeSchema>;
export type SettleDisputeInput = {
    id: string;
    dismiss: boolean;
} & ResolveDisputeInput;
export type DisputeQuery = z.infer<typeof disputeQuerySchema>;
