import { z } from "zod";
import { VIEWING_STATUSES } from "@/lib/enums/enums";
import { userSummarySchema } from "@/lib/validations/user";
import { connectionPropertySchema } from "@/lib/validations/connection";

export const viewingSchema = z.object({
    id: z.string(),
    status: z.enum(VIEWING_STATUSES),
    proposedTimes: z.array(z.iso.datetime()),
    confirmedTime: z.iso.datetime().nullable(),
    notes: z.string().nullable().optional(),
    connectionId: z.string(),
    propertyId: z.string(),
    requestedById: z.string(),
    proposedByid: z.string(),
    confirmedById: z.string().nullable().optional(),
    requestedBy: userSummarySchema.optional(),
    proposedBy: userSummarySchema.optional(),
    property: connectionPropertySchema.optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const createViewingSchema = z.object({
    connectionId: z.string().min(1),
    proposedTimes: z
        .array(z.iso.datetime())
        .min(1, "Propose at least one time"),
});

export const confirmViewingSchema = z.object({
    confirmedTime: z.iso.datetime(),
});

export type Viewing = z.infer<typeof viewingSchema>;
export type CreateViewingInput = z.infer<typeof createViewingSchema>;
export type ConfirmViewingInput = z.infer<typeof confirmViewingSchema>;
