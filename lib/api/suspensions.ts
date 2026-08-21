import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateSuspensionInput,
    Suspension,
    SuspensionPage,
    SuspensionQuery,
} from "@/lib/validations/suspension";

export const suspensionsAPI = {
    list: (input: SuspensionQuery = {}) =>
        query.get<SuspensionPage>(config.api.suspensions.list, {
            params: input,
        }),

    byUser: (userId: string) =>
        query.get<Suspension[]>(config.api.suspensions.byUser(userId)),

    create: (input: CreateSuspensionInput) =>
        query.post<Suspension>(config.api.suspensions.create, input),

    lift: (id: string) =>
        query.patch<Suspension>(config.api.suspensions.lift(id)),
};
