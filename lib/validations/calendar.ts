import { z } from "zod";

export const calendarStatusSchema = z.object({
    available: z.boolean(),
    connected: z.boolean(),
    email: z.string().nullable(),
});

export type CalendarStatus = z.infer<typeof calendarStatusSchema>;
