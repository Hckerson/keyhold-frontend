import { z } from "zod";
import {
    CONTINGENCIES,
    MILESTONE_KINDS,
    MILESTONE_STATUSES,
    OFFER_STATUSES,
} from "@/lib/enums/enums";
import { userSummarySchema } from "@/lib/validations/user";
import { connectionPropertySchema } from "@/lib/validations/connection";

export const offerSchema = z.object({
    id: z.string(),
    status: z.enum(OFFER_STATUSES),
    offeredPrice: z.number(),
    offeredTerms: z.string(),
    moveInDate: z.iso.datetime().nullable().optional(),
    earnestMoney: z.number().nullable().optional(),
    contingencies: z.array(z.enum(CONTINGENCIES)).optional(),
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
    moveInDate: z.iso.datetime().optional(),
    earnestMoney: z.number().nonnegative().optional(),
    contingencies: z.array(z.enum(CONTINGENCIES)).optional(),
});

export const dealMilestoneSchema = z.object({
    id: z.string(),
    kind: z.enum(MILESTONE_KINDS),
    status: z.enum(MILESTONE_STATUSES),
    dueAt: z.iso.datetime().nullable(),
    completedAt: z.iso.datetime().nullable(),
    appraisedValue: z.number().nullable(),
    note: z.string().nullable(),
    documentUrl: z.url().nullable(),
    documentName: z.string().nullable(),
});

export const updateMilestoneSchema = z.object({
    status: z.enum(MILESTONE_STATUSES).optional(),
    dueAt: z.iso.datetime().optional(),
    appraisedValue: z.number().nonnegative().optional(),
    note: z.string().max(500).optional(),
});

export const respondOfferSchema = z.object({
    status: z.enum(OFFER_STATUSES),
    responsePrice: z.number().positive().optional(),
    responseFeedback: z.string().optional(),
});

export type Offer = z.infer<typeof offerSchema>;
export type DealMilestone = z.infer<typeof dealMilestoneSchema>;
export type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>;
export type CreateOfferInput = z.infer<typeof createOfferSchema>;
export type RespondOfferInput = z.infer<typeof respondOfferSchema>;
