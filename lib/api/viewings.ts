import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    ConfirmViewingInput,
    CreateViewingInput,
    RescheduleViewingInput,
    Viewing,
} from "@/lib/validations/viewing";

export const viewingsAPI = {
    byConnection: (connectionId: string) =>
        query.get<Viewing[]>(config.api.viewings.byConnection(connectionId)),

    detail: (id: string) => query.get<Viewing>(config.api.viewings.detail(id)),

    create: (input: CreateViewingInput) =>
        query.post<Viewing>(config.api.viewings.create, input),

    confirm: (id: string, input: ConfirmViewingInput) =>
        query.patch<Viewing>(config.api.viewings.confirm(id), input),

    reschedule: (id: string, input: RescheduleViewingInput) =>
        query.patch<Viewing>(config.api.viewings.reschedule(id), input),

    cancel: (id: string) =>
        query.patch<Viewing>(config.api.viewings.cancel(id)),
};
