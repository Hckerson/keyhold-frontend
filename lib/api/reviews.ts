import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateReviewInput,
    Review,
    UserRating,
} from "@/lib/validations/review";

export const reviewsAPI = {
    byUser: (userId: string) =>
        query.get<Review[]>(config.api.reviews.byUser(userId)),

    userRating: (userId: string) =>
        query.get<UserRating>(config.api.reviews.userRating(userId)),

    byTransaction: (transactionId: string) =>
        query.get<Review[]>(config.api.reviews.byTransaction(transactionId)),

    create: (transactionId: string, input: CreateReviewInput) =>
        query.post<Review>(
            config.api.reviews.byTransaction(transactionId),
            input,
        ),
};
