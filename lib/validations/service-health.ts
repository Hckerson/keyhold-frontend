import { z } from "zod";
import {
    INTEGRATION_IDS,
    SERVICE_COMPONENTS,
    SERVICE_STATES,
} from "@/lib/enums/enums";

export const serviceComponentHealthSchema = z.object({
    id: z.enum(SERVICE_COMPONENTS),
    label: z.string(),
    state: z.enum(SERVICE_STATES),
    uptime: z.number(),
    errorRate: z.number(),
    latencyMs: z.number(),
    latencyP95: z.number(),
    latencyP99: z.number(),
    samples: z.number().int(),
});

export const integrationStatusSchema = z.object({
    id: z.enum(INTEGRATION_IDS),
    label: z.string(),
    capability: z.string(),
    configured: z.boolean(),
    required: z.boolean(),
});

export const serviceHealthSchema = z.object({
    windowHours: z.number().int(),
    since: z.iso.datetime(),
    averageUptime: z.number(),
    services: z.array(serviceComponentHealthSchema),
    integrations: z.array(integrationStatusSchema),
});

export type ServiceComponentHealth = z.infer<
    typeof serviceComponentHealthSchema
>;
export type IntegrationStatus = z.infer<typeof integrationStatusSchema>;
export type ServiceHealth = z.infer<typeof serviceHealthSchema>;
