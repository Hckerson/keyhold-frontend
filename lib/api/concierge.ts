import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    ConciergeClient,
    ConciergeOverview,
    ConciergePractice,
    ConciergeServiceEntry,
    CreateConciergeClientInput,
    CreateConciergePracticeInput,
    CreateConciergeServiceInput,
    UpdateConciergeClientInput,
} from "@/lib/validations/concierge";

export const conciergeAPI = {
    overview: () => query.get<ConciergeOverview>(config.api.concierge.overview),

    clients: () => query.get<ConciergeClient[]>(config.api.concierge.clients),

    client: (id: string) =>
        query.get<ConciergeClient>(config.api.concierge.client(id)),

    createClient: (input: CreateConciergeClientInput) =>
        query.post<ConciergeClient>(config.api.concierge.clients, input),

    updateClient: (id: string, input: UpdateConciergeClientInput) =>
        query.patch<ConciergeClient>(config.api.concierge.client(id), input),

    removeClient: (id: string) =>
        query.delete<ConciergeClient>(config.api.concierge.client(id)),

    services: () =>
        query.get<ConciergeServiceEntry[]>(config.api.concierge.services),

    createService: (input: CreateConciergeServiceInput) =>
        query.post<ConciergeServiceEntry>(config.api.concierge.services, input),

    practices: () =>
        query.get<ConciergePractice[]>(config.api.concierge.practices),

    createPractice: (input: CreateConciergePracticeInput) =>
        query.post<ConciergePractice>(config.api.concierge.practices, input),

    cover: (practiceId: string, clientId: string) =>
        query.post<{ practiceId: string; clientId: string }>(
            config.api.concierge.cover(practiceId, clientId),
        ),
};
