import { z } from "zod";
import {
    CONTACT_CHANNELS,
    CONTACT_DIRECTIONS,
    CONTACT_STATUSES,
} from "@/lib/enums/enums";

export const contactActivitySchema = z.object({
    id: z.string(),
    connectionId: z.string(),
    actorId: z.string(),
    channel: z.enum(CONTACT_CHANNELS),
    direction: z.enum(CONTACT_DIRECTIONS),
    status: z.enum(CONTACT_STATUSES),
    subject: z.string().nullable(),
    body: z.string().nullable(),
    providerRef: z.string().nullable(),
    durationSeconds: z.number().int().nullable(),
    occurredAt: z.iso.datetime(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const sendLeadEmailSchema = z.object({
    subject: z
        .string()
        .trim()
        .min(1, "Give the email a subject")
        .max(200, "Keep the subject under 200 characters"),
    body: z
        .string()
        .trim()
        .min(1, "Write a message before sending")
        .max(5000, "Keep the message under 5000 characters"),
});

export type ContactActivity = z.infer<typeof contactActivitySchema>;
export type SendLeadEmailInput = z.infer<typeof sendLeadEmailSchema>;
