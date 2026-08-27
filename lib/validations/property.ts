import { z } from "zod";
import {
    PROPERTY_STATUSES,
    PROPERTY_TYPES,
    PROPERTY_SORTS,
} from "@/lib/enums/enums";
import {
    MAX_PROMOTION_DAYS,
    MIN_PROMOTION_DAYS,
} from "@/lib/config/listing-promotion";

export const propertyImageSchema = z.object({
    id: z.string(),
    url: z.url(),
    order: z.number().int(),
});

export const propertySellerSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    avatar: z.string().nullable().optional(),
    email: z.email().optional(),
    phoneNumber: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    jobTitle: z.string().nullable().optional(),
    agencyName: z.string().nullable().optional(),
    licenseNumber: z.string().nullable().optional(),
    createdAt: z.iso.datetime().optional(),
});

export const propertySchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    address: z.string(),
    locality: z.string(),
    region: z.string(),
    postalCode: z.string(),
    country: z.string(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    price: z.number(),
    bedrooms: z.number().int(),
    bathrooms: z.number().int(),
    sqFt: z.number().nullable(),
    lotSqFt: z.number().nullable(),
    yearBuilt: z.number().int().nullable(),
    walkScore: z.number().int().nullable(),
    viewsCount: z.number().int(),
    featuredUntil: z.iso.datetime().nullable().optional(),
    amenities: z.array(z.string()),
    features: z.array(z.string()),
    type: z.enum(PROPERTY_TYPES),
    status: z.enum(PROPERTY_STATUSES),
    sellerId: z.string(),
    seller: propertySellerSchema.optional(),
    images: z.array(propertyImageSchema).default([]),
    _count: z
        .object({
            savedBy: z.number().int(),
            viewings: z.number().int().optional(),
            offers: z.number().int().optional(),
        })
        .optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const propertyPageSchema = z.object({
    items: z.array(propertySchema),
    total: z.number().int(),
    page: z.number().int(),
    limit: z.number().int(),
    pageCount: z.number().int(),
});

export const createPropertySchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters"),
    address: z.string().min(5, "Address is required"),
    locality: z.string().min(2, "Locality is required"),
    region: z.string().min(2, "Region is required"),
    postalCode: z.string().min(3, "Postal code is required"),
    country: z.string().optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    price: z.number().positive("Price must be positive"),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().int().min(0),
    sqFt: z.number().positive().optional(),
    lotSqFt: z.number().positive().optional(),
    yearBuilt: z.number().int().min(1600).optional(),
    walkScore: z.number().int().min(0).max(100).optional(),
    type: z.enum(PROPERTY_TYPES),
    amenities: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
});

export const updatePropertySchema = createPropertySchema.partial().extend({
    status: z.enum(PROPERTY_STATUSES).optional(),
});

export const promotePropertySchema = z.object({
    days: z.number().int().min(MIN_PROMOTION_DAYS).max(MAX_PROMOTION_DAYS),
});

export const propertyQuerySchema = z.object({
    status: z.enum(PROPERTY_STATUSES).optional(),
    types: z.array(z.enum(PROPERTY_TYPES)).optional(),
    locality: z.string().optional(),
    q: z.string().optional(),
    priceRanges: z.array(z.string()).optional(),
    beds: z.array(z.string()).optional(),
    baths: z.array(z.string()).optional(),
    minSqFt: z.number().optional(),
    sort: z.enum(PROPERTY_SORTS).optional(),
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
});

export const facetCountsSchema = z.object({
    price: z.record(z.string(), z.number()),
    beds: z.record(z.string(), z.number()),
    baths: z.record(z.string(), z.number()),
    type: z.record(z.string(), z.number()),
});

export type PropertyImage = z.infer<typeof propertyImageSchema>;
export type PropertySeller = z.infer<typeof propertySellerSchema>;
export type Property = z.infer<typeof propertySchema>;
export type PropertyPage = z.infer<typeof propertyPageSchema>;
export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
export type PromotePropertyInput = z.infer<typeof promotePropertySchema>;
export type PropertyQuery = z.infer<typeof propertyQuerySchema>;
export type FacetCounts = z.infer<typeof facetCountsSchema>;
