import { query, type UploadProgress } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateOfferInput,
    DealMilestone,
    Offer,
    RespondOfferInput,
    UpdateMilestoneInput,
} from "@/lib/validations/offer";
import type { MilestoneKind } from "@/lib/enums/enums";

export const offersAPI = {
    byConnection: (connectionId: string) =>
        query.get<Offer[]>(config.api.offers.byConnection(connectionId)),

    detail: (id: string) => query.get<Offer>(config.api.offers.detail(id)),

    create: (input: CreateOfferInput) =>
        query.post<Offer>(config.api.offers.create, input),

    respond: (id: string, input: RespondOfferInput) =>
        query.patch<Offer>(config.api.offers.respond(id), input),

    acceptCounter: (id: string) =>
        query.patch<Offer>(config.api.offers.acceptCounter(id)),

    milestones: (id: string) =>
        query.get<DealMilestone[]>(config.api.offers.milestones(id)),

    updateMilestone: (
        id: string,
        kind: MilestoneKind,
        input: UpdateMilestoneInput,
    ) =>
        query.patch<DealMilestone>(
            config.api.offers.milestone(id, kind),
            input,
        ),

    attachMilestoneDocument: (
        id: string,
        kind: MilestoneKind,
        file: File,
        onProgress?: UploadProgress,
    ) => {
        const body = new FormData();
        body.append("file", file);
        return query.upload<DealMilestone>(
            config.api.offers.milestoneDocument(id, kind),
            body,
            onProgress,
        );
    },
};
