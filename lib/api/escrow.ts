import { allPages } from "@/lib/api/all-pages";
import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    Escrow,
    EscrowPage,
    EscrowQuery,
    EscrowRefund,
    EscrowRelease,
    EscrowStage,
    RefundEscrowInput,
} from "@/lib/validations/escrow";

export const escrowAPI = {
    list: (input: EscrowQuery = {}) =>
        query.get<EscrowPage>(config.api.escrow.list, { params: input }),

    holds: (input: EscrowQuery = {}) =>
        allPages((paging) => escrowAPI.list({ ...input, ...paging })),

    stages: () => query.get<EscrowStage[]>(config.api.escrow.stages),

    detail: (id: string) => query.get<Escrow>(config.api.escrow.detail(id)),

    release: (id: string) =>
        query.patch<EscrowRelease>(config.api.escrow.release(id)),

    refund: (id: string, input: RefundEscrowInput) =>
        query.patch<EscrowRefund>(config.api.escrow.refund(id), input),
};
