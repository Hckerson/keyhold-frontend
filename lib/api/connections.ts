import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    Connection,
    CreateConnectionInput,
    CreateLeadInput,
} from "@/lib/validations/connection";
import type { ConnectionListItem } from "@/lib/validations/connection-list";

export const connectionsAPI = {
    myInterests: () =>
        query.get<ConnectionListItem[]>(config.api.connections.myInterests),

    incoming: () =>
        query.get<ConnectionListItem[]>(config.api.connections.incoming),

    detail: (id: string) =>
        query.get<Connection>(config.api.connections.detail(id)),

    create: (input: CreateConnectionInput) =>
        query.post<Connection>(config.api.connections.create, input),

    recordLead: (input: CreateLeadInput) =>
        query.post<Connection>(config.api.connections.leads, input),

    accept: (id: string) =>
        query.patch<Connection>(config.api.connections.accept(id)),

    reject: (id: string) =>
        query.patch<Connection>(config.api.connections.reject(id)),
};
