import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    AddEvidenceInput,
    CreateDisputeInput,
    Dispute,
    DisputeCounts,
    DisputeEvidence,
    DisputePage,
    DisputeQuery,
    ResolveDisputeInput,
} from "@/lib/validations/dispute";

export const disputesAPI = {
    list: (input: DisputeQuery = {}) =>
        query.get<DisputePage>(config.api.disputes.list, { params: input }),

    mine: () => query.get<Dispute[]>(config.api.disputes.mine),

    counts: () => query.get<DisputeCounts>(config.api.disputes.counts),

    detail: (id: string) => query.get<Dispute>(config.api.disputes.detail(id)),

    create: (input: CreateDisputeInput) =>
        query.post<Dispute>(config.api.disputes.create, input),

    addEvidence: (id: string, input: AddEvidenceInput) =>
        query.post<DisputeEvidence>(config.api.disputes.evidence(id), input),

    resolve: (id: string, input: ResolveDisputeInput) =>
        query.patch<Dispute>(config.api.disputes.resolve(id), input),

    dismiss: (id: string, input: ResolveDisputeInput) =>
        query.patch<Dispute>(config.api.disputes.dismiss(id), input),
};
