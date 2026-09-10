import { query } from "@/lib/api/client";

const PERCENT = 100;
import { config } from "@/lib/constants";
import type {
    CreateUserInput,
    TierDistribution,
    UpdateUserInput,
    User,
} from "@/lib/validations/user";
import type { UserTier } from "@/lib/enums/enums";
import type { PersonalDataExport } from "@/lib/types/personal-data";

export const usersAPI = {
    me: () => query.get<User>(config.api.users.me),

    list: () => query.get<User[]>(config.api.users.list),

    create: (input: CreateUserInput) =>
        query.post<User>(config.api.users.list, input),

    detail: (id: string) => query.get<User>(config.api.users.detail(id)),

    update: (id: string, input: UpdateUserInput) =>
        query.patch<User>(config.api.users.detail(id), input),

    tierDistribution: () =>
        query.get<TierDistribution>(config.api.users.tierDistribution),

    setTier: (id: string, tier: UserTier) =>
        query.patch<User>(config.api.users.tier(id), { tier }),

    remove: (id: string) => query.delete<User>(config.api.users.detail(id)),

    uploadAvatar: (file: File, onProgress?: (percent: number) => void) => {
        const body = new FormData();
        body.append("file", file);
        return query.post<User>(config.api.users.avatar, body, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (event) => {
                if (!onProgress || !event.total) return;
                onProgress(Math.round((event.loaded / event.total) * PERCENT));
            },
        });
    },

    exportMine: () => query.get<PersonalDataExport>(config.api.users.export),

    eraseMine: () =>
        query.delete<{ erased: boolean; alreadyErased: boolean }>(
            config.api.users.eraseMe,
        ),
};
