import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateOfferInput,
    Offer,
    RespondOfferInput,
} from "@/lib/validations/offer";

export const offersAPI = {
    byConnection: (connectionId: string) =>
        query.get<Offer[]>(config.api.offers.byConnection(connectionId)),

    detail: (id: string) => query.get<Offer>(config.api.offers.detail(id)),

    create: (input: CreateOfferInput) =>
        query.post<Offer>(config.api.offers.create, input),

    respond: (id: string, input: RespondOfferInput) =>
        query.patch<Offer>(config.api.offers.respond(id), input),
};
