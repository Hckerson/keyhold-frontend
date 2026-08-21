import { z } from "zod";
import { ESCROW_STATUSES } from "@/lib/enums/enums";
import { pageOf, pageQuerySchema } from "@/lib/validations/pagination";
import {
    escrowHoldSchema,
    settlementTransactionSchema,
} from "@/lib/validations/transaction";

export const escrowSchema = escrowHoldSchema.extend({
    transaction: settlementTransactionSchema.nullable().optional(),
});

export const escrowPageSchema = pageOf(escrowSchema);

export const escrowStageSchema = z.object({
    status: z.enum(ESCROW_STATUSES),
    count: z.number().int(),
    amount: z.number(),
    oldestAt: z.iso.datetime().nullable(),
});

export const escrowReleaseSchema = z.object({
    escrow: escrowSchema,
    agreementUrl: z.string(),
});

export const escrowRefundSchema = z.object({
    escrow: escrowSchema,
    reason: z.string(),
});

export const refundEscrowSchema = z.object({
    reason: z.string().min(4, "Give a reason of at least four characters"),
});

export const escrowQuerySchema = pageQuerySchema.extend({
    status: z.enum(ESCROW_STATUSES).optional(),
});

export type Escrow = z.infer<typeof escrowSchema>;
export type EscrowPage = z.infer<typeof escrowPageSchema>;
export type EscrowStage = z.infer<typeof escrowStageSchema>;
export type EscrowRelease = z.infer<typeof escrowReleaseSchema>;
export type EscrowRefund = z.infer<typeof escrowRefundSchema>;
export type RefundEscrowInput = z.infer<typeof refundEscrowSchema>;
export type EscrowQuery = z.infer<typeof escrowQuerySchema>;
