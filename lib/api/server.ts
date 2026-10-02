import type { z } from "zod";
import { config } from "@/lib/constants";
import type { ApiEnvelope } from "@/lib/api/client";
import type { FacetOptions } from "@/lib/api/properties";
import {
    facetCountsSchema,
    localityCountsSchema,
    type Property,
    type PropertyPage,
    type PropertyQuery,
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

async function serverFetch<T>(
    path: string,
    init?: RequestInit,
): Promise<T | null> {
    try {
        const response = await fetch(`${config.api.base}${path}`, {
            ...init,
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

async function serverParse<S extends z.ZodType>(
    schema: S,
    path: string,
    init?: RequestInit,
): Promise<z.infer<S> | null> {
    const parsed = schema.safeParse(await serverFetch<unknown>(path, init));
    return parsed.success ? parsed.data : null;
}

export const propertiesServerAPI = {
    detail: (id: string) =>
        serverFetch<Property>(`${config.api.properties.detail(id)}`),

    list: (input: PropertyQuery = {}) =>
        serverFetch<PropertyPage>(
            `${config.api.properties.list}?${toSearchParams(input)}`,
        ),

    facets: (filters: PropertyQuery, options: FacetOptions) =>
        serverParse(facetCountsSchema, config.api.properties.facets, {
            method: "POST",
            body: JSON.stringify({ filters, options }),
        }),

    localities: () =>
        serverParse(localityCountsSchema, config.api.properties.localities),
};
