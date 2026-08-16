import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    Connection,
    CreateConnectionInput,
} from "@/lib/validations/connection";

export const connectionsAPI = {
    myInterests: () =>
        query.get<Connection[]>(config.api.connections.myInterests),

    incoming: () => query.get<Connection[]>(config.api.connections.incoming),

    detail: (id: string) =>
        query.get<Connection>(config.api.connections.detail(id)),

    create: (input: CreateConnectionInput) =>
        query.post<Connection>(config.api.connections.create, input),

    accept: (id: string) =>
        query.patch<Connection>(config.api.connections.accept(id)),

    reject: (id: string) =>
        query.patch<Connection>(config.api.connections.reject(id)),
};
