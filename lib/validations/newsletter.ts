import { z } from "zod";

export const NEWSLETTER_SOURCES = ["footer"] as const;

export const newsletterSignupSchema = z.object({
    email: z.email("Enter a valid email address").trim().toLowerCase(),
});

export const subscribeNewsletterSchema = newsletterSignupSchema.extend({
    consent: z.literal(true),
    consentText: z.string().trim().min(1),
    source: z.enum(NEWSLETTER_SOURCES),
});

export const subscribeAcceptedSchema = z.object({ message: z.string() });

export const newsletterConfirmedSchema = z.object({
    status: z.literal("CONFIRMED"),
});

export const newsletterUnsubscribedSchema = z.object({
    status: z.literal("UNSUBSCRIBED"),
});

export type NewsletterSignupInput = z.infer<typeof newsletterSignupSchema>;
export type SubscribeNewsletterInput = z.infer<
    typeof subscribeNewsletterSchema
>;
export type SubscribeAccepted = z.infer<typeof subscribeAcceptedSchema>;
export type NewsletterConfirmed = z.infer<typeof newsletterConfirmedSchema>;
export type NewsletterUnsubscribed = z.infer<
    typeof newsletterUnsubscribedSchema
>;
