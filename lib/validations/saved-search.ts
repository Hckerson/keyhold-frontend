import { z } from "zod";
import { PROPERTY_TYPES } from "@/lib/enums/enums";
import { propertySchema } from "@/lib/validations/property";

export const savedSearchSchema = z.object({
    id: z.string(),
    buyerId: z.string(),
    name: z.string(),
    locality: z.string().nullable(),
    minPrice: z.number().nullable(),
    maxPrice: z.number().nullable(),
    minBedrooms: z.number().int().nullable(),
    minBathrooms: z.number().int().nullable(),
    minSqFt: z.number().int().nullable(),
    propertyType: z.enum(PROPERTY_TYPES).nullable(),
    notify: z.boolean(),
    lastRunAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const matchFacetSchema = z.object({
    id: z.string(),
    label: z.string(),
    met: z.boolean(),
});

export const matchScoreSchema = z.object({
    score: z.number(),
    facets: z.array(matchFacetSchema),
});

export const savedSearchMatchSchema = matchScoreSchema.extend({
    property: propertySchema,
});

export const createSavedSearchSchema = z.object({
    name: z.string().min(1, "Give this search a name"),
    locality: z.string().optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    minBedrooms: z.number().int().min(0).optional(),
    minBathrooms: z.number().int().min(0).optional(),
    minSqFt: z.number().int().min(0).optional(),
    propertyType: z.enum(PROPERTY_TYPES).optional(),
    notify: z.boolean().optional(),
});

export const updateSavedSearchSchema = createSavedSearchSchema.partial();

export type SavedSearch = z.infer<typeof savedSearchSchema>;
export type MatchFacet = z.infer<typeof matchFacetSchema>;
export type MatchScore = z.infer<typeof matchScoreSchema>;
export type SavedSearchMatch = z.infer<typeof savedSearchMatchSchema>;
export type CreateSavedSearchInput = z.infer<typeof createSavedSearchSchema>;
export type UpdateSavedSearchInput = z.infer<typeof updateSavedSearchSchema>;
