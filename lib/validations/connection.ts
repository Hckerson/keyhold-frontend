import { z } from "zod";
import { CONNECTION_STATUSES } from "@/lib/enums/enums";
import { userSummarySchema } from "@/lib/validations/user";

export const connectionPropertySchema = z.object({
    id: z.string(),
    title: z.string().optional(),
});

export const connectionSchema = z.object({
    id: z.string(),
    status: z.enum(CONNECTION_STATUSES),
    buyerId: z.string(),
    sellerId: z.string(),
    propertyId: z.string(),
    buyer: userSummarySchema.optional(),
    seller: userSummarySchema.optional(),
    property: connectionPropertySchema.optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const createConnectionSchema = z.object({
    propertyId: z.string().min(1, "Select a property"),
});

export type Connection = z.infer<typeof connectionSchema>;
export type CreateConnectionInput = z.infer<typeof createConnectionSchema>;
