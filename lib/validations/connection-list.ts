import { z } from "zod";
import { CONNECTION_STATUSES, PROPERTY_STATUSES } from "@/lib/enums/enums";
import { contactActivitySchema } from "@/lib/validations/contact";
import { messageSchema } from "@/lib/validations/message";
import { offerSchema } from "@/lib/validations/offer";
import { propertyImageSchema } from "@/lib/validations/property";
import { userSummarySchema } from "@/lib/validations/user";
import { viewingSchema } from "@/lib/validations/viewing";

export const connectionPartySchema = userSummarySchema.extend({
    jobTitle: z.string().nullable().optional(),
    agencyName: z.string().nullable().optional(),
});

export const connectionListPropertySchema = z.object({
    id: z.string(),
    title: z.string(),
    price: z.number(),
    address: z.string(),
    locality: z.string(),
    status: z.enum(PROPERTY_STATUSES),
    images: z.array(propertyImageSchema).default([]),
});

export const connectionCountsSchema = z.object({
    messages: z.number().int(),
    viewings: z.number().int(),
    offers: z.number().int(),
});

export const connectionListItemSchema = z.object({
    id: z.string(),
    status: z.enum(CONNECTION_STATUSES),
    buyerId: z.string(),
    sellerId: z.string(),
    propertyId: z.string(),
    buyer: connectionPartySchema,
    seller: connectionPartySchema,
    property: connectionListPropertySchema,
    messages: z.array(messageSchema).default([]),
    offers: z.array(offerSchema).default([]),
    viewings: z.array(viewingSchema).default([]),
    contactActivities: z.array(contactActivitySchema).default([]),
    _count: connectionCountsSchema,
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export type ConnectionParty = z.infer<typeof connectionPartySchema>;
export type ConnectionListProperty = z.infer<
    typeof connectionListPropertySchema
>;
export type ConnectionListItem = z.infer<typeof connectionListItemSchema>;
