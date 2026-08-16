import { z } from "zod";
import { OFFER_STATUSES } from "@/lib/enums/enums";
import { userSummarySchema } from "@/lib/validations/user";
import { connectionPropertySchema } from "@/lib/validations/connection";

export const offerSchema = z.object({
    id: z.string(),
    status: z.enum(OFFER_STATUSES),
    offeredPrice: z.number(),
    offeredTerms: z.string(),
    responsePrice: z.number().nullable(),
    responseFeedback: z.string().nullable(),
    connectionId: z.string(),
    propertyId: z.string(),
    offererId: z.string(),
    responseFromId: z.string().nullable(),
    offerer: userSummarySchema.optional(),
    property: connectionPropertySchema.optional(),
    expiresAt: z.iso.datetime(),
    respondedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const createOfferSchema = z.object({
    connectionId: z.string().min(1),
    offeredPrice: z.number().positive("Enter an offer amount"),
    offeredTerms: z.string().min(1, "Describe your terms"),
    expiresAt: z.iso.datetime(),
});

export const respondOfferSchema = z.object({
    status: z.enum(OFFER_STATUSES),
    responsePrice: z.number().positive().optional(),
    responseFeedback: z.string().optional(),
});

export type Offer = z.infer<typeof offerSchema>;
export type CreateOfferInput = z.infer<typeof createOfferSchema>;
export type RespondOfferInput = z.infer<typeof respondOfferSchema>;
