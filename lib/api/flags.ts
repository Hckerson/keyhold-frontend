import { allPages } from "@/lib/api/all-pages";
import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateFlagInput,
    Flag,
    FlagCounts,
    FlagPage,
    FlagQuery,
    ResolveFlagInput,
} from "@/lib/validations/flag";

export const flagsAPI = {
    list: (input: FlagQuery = {}) =>
        query.get<FlagPage>(config.api.flags.list, { params: input }),

    all: (input: FlagQuery = {}) =>
        allPages((paging) => flagsAPI.list({ ...input, ...paging })),

    counts: () => query.get<FlagCounts>(config.api.flags.counts),

    detail: (id: string) => query.get<Flag>(config.api.flags.detail(id)),

    create: (input: CreateFlagInput) =>
        query.post<Flag>(config.api.flags.list, input),

    resolve: (id: string, input: ResolveFlagInput = {}) =>
        query.patch<Flag>(config.api.flags.resolve(id), input),

    dismiss: (id: string, input: ResolveFlagInput = {}) =>
        query.patch<Flag>(config.api.flags.dismiss(id), input),
};
