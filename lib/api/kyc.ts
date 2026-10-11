import { allPages } from "@/lib/api/all-pages";
import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    IdentityDocument,
    IdentityDocumentPage,
    KycCounts,
    KycQuery,
    RejectKycInput,
    SubmitKycInput,
} from "@/lib/validations/kyc";

export const kycAPI = {
    list: (input: KycQuery = {}) =>
        query.get<IdentityDocumentPage>(config.api.kyc.list, { params: input }),

    queue: (input: KycQuery = {}) =>
        allPages((paging) => kycAPI.list({ ...input, ...paging })),

    counts: () => query.get<KycCounts>(config.api.kyc.counts),

    mine: () => query.get<IdentityDocument[]>(config.api.kyc.mine),

    detail: (id: string) =>
        query.get<IdentityDocument>(config.api.kyc.detail(id)),

    submit: (input: SubmitKycInput, document: File, face?: File) => {
        const body = new FormData();
        Object.entries(input).forEach(([key, value]) =>
            body.append(key, value),
        );
        body.append("document", document);
        if (face) body.append("face", face);
        return query.upload<IdentityDocument>(config.api.kyc.submit, body);
    },

    approve: (id: string) =>
        query.patch<IdentityDocument>(config.api.kyc.approve(id)),

    reject: (id: string, input: RejectKycInput) =>
        query.patch<IdentityDocument>(config.api.kyc.reject(id), input),
};
