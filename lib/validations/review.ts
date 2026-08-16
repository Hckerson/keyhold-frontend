import { z } from "zod";
import { userSummarySchema } from "@/lib/validations/user";

export const reviewSchema = z.object({
    id: z.string(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().nullable(),
    transactionId: z.string(),
    reviewerId: z.string(),
    revieweeId: z.string(),
    reviewer: userSummarySchema.optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const userRatingSchema = z.object({
    average: z.number(),
    count: z.number().int(),
});

export const createReviewSchema = z.object({
    rating: z.number().int().min(1, "Pick a rating").max(5),
    comment: z.string().optional(),
});

export type Review = z.infer<typeof reviewSchema>;
export type UserRating = z.infer<typeof userRatingSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
