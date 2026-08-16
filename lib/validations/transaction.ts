import { z } from "zod";
import { TRANSACTION_STATUSES } from "@/lib/enums/enums";
import { userSummarySchema } from "@/lib/validations/user";
import { connectionPropertySchema } from "@/lib/validations/connection";

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
    buyer: userSummarySchema.optional(),
    seller: userSummarySchema.optional(),
    property: connectionPropertySchema.optional(),
    completedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const createTransactionSchema = z.object({
    offerId: z.string().min(1),
    finalPrice: z.number().positive(),
    terms: z.string().min(1),
});

export type Transaction = z.infer<typeof transactionSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
