import { z } from "zod";
import { SERVICE_COMPONENTS, SERVICE_STATES } from "@/lib/enums/enums";

export const serviceComponentHealthSchema = z.object({
    id: z.enum(SERVICE_COMPONENTS),
    label: z.string(),
    state: z.enum(SERVICE_STATES),
    uptime: z.number(),
    errorRate: z.number(),
    latencyMs: z.number(),
    samples: z.number().int(),
});

export const serviceHealthSchema = z.object({
    windowHours: z.number().int(),
    since: z.iso.datetime(),
    averageUptime: z.number(),
    services: z.array(serviceComponentHealthSchema),
});

export type ServiceComponentHealth = z.infer<
    typeof serviceComponentHealthSchema
>;
export type ServiceHealth = z.infer<typeof serviceHealthSchema>;
