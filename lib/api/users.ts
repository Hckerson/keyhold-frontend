import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { UpdateUserInput, User } from "@/lib/validations/user";

export const usersAPI = {
    me: () => query.get<User>(config.api.users.me),

    list: () => query.get<User[]>(config.api.users.list),

    detail: (id: string) => query.get<User>(config.api.users.detail(id)),

    update: (id: string, input: UpdateUserInput) =>
        query.patch<User>(config.api.users.detail(id), input),

    remove: (id: string) => query.delete<User>(config.api.users.detail(id)),
};
