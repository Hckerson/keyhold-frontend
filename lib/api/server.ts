import { config } from "@/lib/constants";
import type { ApiEnvelope } from "@/lib/api/client";
import type { NearbyPlace } from "@/lib/types";
import type {
    Property,
    PropertyPage,
    PropertyQuery,
} from "@/lib/validations/property";

const REVALIDATE_SECONDS = 60;

const toSearchParams = (input: PropertyQuery) => {
    const params = new URLSearchParams();

    Object.entries(input).forEach(([key, value]) => {
        if (value === undefined || value === "") return;
        if (Array.isArray(value)) {
            value.forEach((entry) => params.append(key, String(entry)));
            return;
        }
        params.append(key, String(value));
    });

    return params;
};

async function serverGet<T>(path: string): Promise<T | null> {
    try {
        const response = await fetch(`${config.api.base}${path}`, {
            headers: { "Content-Type": "application/json" },
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!response.ok) return null;

        const envelope = (await response.json()) as ApiEnvelope<T>;
        return envelope.data;
    } catch {
        return null;
    }
}

export const propertiesServerAPI = {
    detail: (id: string) =>
        serverGet<Property>(`${config.api.properties.detail(id)}`),

    nearby: (id: string) =>
        serverGet<NearbyPlace[]>(`${config.api.properties.nearby(id)}`),

    list: (input: PropertyQuery = {}) =>
        serverGet<PropertyPage>(
            `${config.api.properties.list}?${toSearchParams(input)}`,
        ),
};
