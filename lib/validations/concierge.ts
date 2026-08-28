import { z } from "zod";
import { CONCIERGE_STATUSES, CONCIERGE_TIERS } from "@/lib/enums/enums";

export const conciergeClientSchema = z.object({
    id: z.string(),
    clientId: z.string(),
    name: z.string(),
    portrait: z.string().nullable(),
    tier: z.enum(CONCIERGE_TIERS),
    status: z.enum(CONCIERGE_STATUSES),
    budget: z.number(),
    allocated: z.number(),
    allocationPercent: z.number(),
    clientSince: z.number().int(),
    lastContact: z.iso.datetime().nullable(),
    nextAction: z.string().nullable(),
    openRequests: z.number().int(),
});

export const conciergeServiceSchema = z.object({
    id: z.string(),
    key: z.string(),
    label: z.string(),
    capacity: z.number().int(),
    openRequests: z.number().int(),
});

export const conciergePracticeSchema = z.object({
    id: z.string(),
    key: z.string(),
    label: z.string(),
    cadence: z.string(),
    covered: z.number().int(),
});

export const conciergeOverviewSchema = z.object({
    relationships: z.number().int(),
    bookValue: z.number(),
    allocated: z.number(),
    allocatedPercent: z.number(),
    openRequests: z.number().int(),
    closedDeals: z.number().int(),
});

export const createConciergeClientSchema = z.object({
    clientId: z.string().min(1),
    budget: z.number().min(0),
    allocated: z.number().min(0).optional(),
    clientSince: z.number().int(),
    tier: z.enum(CONCIERGE_TIERS).optional(),
    status: z.enum(CONCIERGE_STATUSES).optional(),
    nextAction: z.string().optional(),
});

export const updateConciergeClientSchema = createConciergeClientSchema
    .partial()
    .omit({ clientId: true });

export const createConciergeServiceSchema = z.object({
    key: z.string().min(1),
    label: z.string().min(1),
    capacity: z.number().int().min(0),
});

export const createConciergePracticeSchema = z.object({
    key: z.string().min(1),
    label: z.string().min(1),
    cadence: z.string().min(1),
});

export type ConciergeClient = z.infer<typeof conciergeClientSchema>;
export type ConciergeServiceEntry = z.infer<typeof conciergeServiceSchema>;
export type ConciergePractice = z.infer<typeof conciergePracticeSchema>;
export type ConciergeOverview = z.infer<typeof conciergeOverviewSchema>;
export type CreateConciergeClientInput = z.infer<
    typeof createConciergeClientSchema
>;
export type UpdateConciergeClientInput = z.infer<
    typeof updateConciergeClientSchema
>;
export type CreateConciergeServiceInput = z.infer<
    typeof createConciergeServiceSchema
>;
export type CreateConciergePracticeInput = z.infer<
    typeof createConciergePracticeSchema
>;
