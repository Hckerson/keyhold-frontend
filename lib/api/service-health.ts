import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { ServiceHealth } from "@/lib/validations/service-health";

export const serviceHealthAPI = {
    list: (windowHours?: number) =>
        query.get<ServiceHealth>(config.api.serviceHealth.list, {
            params: windowHours ? { windowHours } : undefined,
        }),
};
