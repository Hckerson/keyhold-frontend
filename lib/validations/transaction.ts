import { z } from "zod";
import { ESCROW_STATUSES, TRANSACTION_STATUSES } from "@/lib/enums/enums";
import { userSummarySchema } from "@/lib/validations/user";
import { connectionListPropertySchema } from "@/lib/validations/connection-list";
import { disputeSummarySchema } from "@/lib/validations/dispute";
import { pageOf, pageQuerySchema } from "@/lib/validations/pagination";

export const escrowHoldSchema = z.object({
    id: z.string(),
    amount: z.number(),
    inspectionEndDate: z.iso.datetime(),
    stripeTransferId: z.string().nullable(),
    stripeAccountId: z.string().nullable(),
    status: z.enum(ESCROW_STATUSES),
    releasedAt: z.iso.datetime().nullable(),
    refundedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const transactionPropertySchema = z.object({
    id: z.string(),
    title: z.string(),
    address: z.string(),
    locality: z.string(),
    price: z.number(),
});

export const transactionSchema = z.object({
    id: z.string(),
    status: z.enum(TRANSACTION_STATUSES),
    finalPrice: z.number(),
    terms: z.string(),
    agreementDocUrl: z.string().nullable(),
    stripePaymentIntentId: z.string().nullable(),
    connectionId: z.string(),
    propertyId: z.string(),
    buyerId: z.string(),
    sellerId: z.string(),
    escrowHoldId: z.string().nullable().optional(),
    disputeId: z.string().nullable().optional(),
    buyer: userSummarySchema.optional(),
    seller: userSummarySchema.optional(),
    property: connectionListPropertySchema.optional(),
    escrowHold: escrowHoldSchema.nullable().optional(),
    dispute: disputeSummarySchema.nullable().optional(),
    completedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const settlementTransactionSchema = transactionSchema.extend({
    buyer: userSummarySchema,
    seller: userSummarySchema,
    property: transactionPropertySchema,
    escrowHold: escrowHoldSchema.nullable().optional(),
    dispute: disputeSummarySchema.nullable().optional(),
});

export const transactionPageSchema = pageOf(settlementTransactionSchema);

export const transactionStageSchema = z.object({
    status: z.enum(TRANSACTION_STATUSES),
    count: z.number().int(),
    volume: z.number(),
});

export const createTransactionSchema = z.object({
    offerId: z.string().min(1),
    finalPrice: z.number().positive(),
    terms: z.string().min(1),
});

export const paymentIntentSchema = z.object({
    id: z.string(),
    clientSecret: z.string().nullable(),
    amount: z.number(),
});

export const createTransactionResultSchema = z.object({
    transaction: transactionSchema,
    paymentIntent: paymentIntentSchema,
});

export const settledTransactionSchema = z.object({
    transaction: transactionSchema.nullable(),
    escrow: escrowHoldSchema,
    inspectionEndDate: z.iso.datetime(),
});

export const transactionQuerySchema = pageQuerySchema.extend({
    status: z.enum(TRANSACTION_STATUSES).optional(),
    q: z.string().optional(),
});

export type EscrowHold = z.infer<typeof escrowHoldSchema>;
export type TransactionProperty = z.infer<typeof transactionPropertySchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type SettlementTransaction = z.infer<typeof settlementTransactionSchema>;
export type TransactionPage = z.infer<typeof transactionPageSchema>;
export type TransactionStage = z.infer<typeof transactionStageSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type PaymentIntent = z.infer<typeof paymentIntentSchema>;
export type CreateTransactionResult = z.infer<
    typeof createTransactionResultSchema
>;
export type SettledTransaction = z.infer<typeof settledTransactionSchema>;
export type TransactionQuery = z.infer<typeof transactionQuerySchema>;
