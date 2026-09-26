import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    NewsletterConfirmed,
    NewsletterUnsubscribed,
    SubscribeAccepted,
    SubscribeNewsletterInput,
} from "@/lib/validations/newsletter";

export const newsletterAPI = {
    subscribe: (input: SubscribeNewsletterInput) =>
        query.post<SubscribeAccepted>(config.api.newsletter.subscribe, input),

    confirm: (token: string) =>
        query.post<NewsletterConfirmed>(config.api.newsletter.confirm, {
            token,
        }),

    unsubscribe: (token: string) =>
        query.post<NewsletterUnsubscribed>(config.api.newsletter.unsubscribe, {
            token,
        }),
};
