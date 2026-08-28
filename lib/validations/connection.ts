import { z } from "zod";
import { CONNECTION_STATUSES } from "@/lib/enums/enums";
import { userSummarySchema } from "@/lib/validations/user";

export const connectionPropertySchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    address: z.string().optional(),
    price: z.number().optional(),
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

export const createLeadSchema = z.object({
    propertyId: z.string().min(1, "Choose one of your listings"),
    buyerEmail: z.email("Enter the buyer's registered email address"),
});

export type Connection = z.infer<typeof connectionSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type CreateConnectionInput = z.infer<typeof createConnectionSchema>;
