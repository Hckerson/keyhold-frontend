import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    PlatformSetting,
    PurgeResult,
    UpdateSettingsInput,
} from "@/lib/validations/setting";

export const settingsAPI = {
    list: () => query.get<PlatformSetting[]>(config.api.settings.list),

    update: (input: UpdateSettingsInput) =>
        query.put<PlatformSetting[]>(config.api.settings.list, input),

    restoreDefaults: () =>
        query.post<PlatformSetting[]>(config.api.settings.restoreDefaults),

    purgeVerifications: () =>
        query.post<PurgeResult>(config.api.settings.purgeVerifications),
};
