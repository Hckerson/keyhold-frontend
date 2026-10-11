import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import { serviceHealthSchema } from "@/lib/validations/service-health";

export const serviceHealthAPI = {
    list: (windowHours?: number) =>
        query
            .get<unknown>(config.api.serviceHealth.list, {
                params: windowHours ? { windowHours } : undefined,
            })
            .then((health) => serviceHealthSchema.parse(health)),
};
