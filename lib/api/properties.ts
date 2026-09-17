import { query } from "@/lib/api/client";

const PERCENT = 100;
import { config } from "@/lib/constants";
import type {
    CreatePropertyInput,
    FacetCounts,
    Property,
    PropertyImage,
    PropertyPage,
    PropertyQuery,
    UpdatePropertyInput,
} from "@/lib/validations/property";
import type { ModerationDecision, PropertyType } from "@/lib/enums/enums";
import type { NearbyPlace } from "@/lib/types";

export interface FacetOptions {
    price: string[];
    beds: string[];
    baths: string[];
    type: PropertyType[];
}

const toParams = (input: PropertyQuery) =>
    Object.fromEntries(
        Object.entries(input).filter(
            ([, value]) =>
                value !== undefined &&
                value !== "" &&
                (!Array.isArray(value) || value.length > 0),
        ),
    );

export const propertiesAPI = {
    list: (input: PropertyQuery = {}) =>
        query.get<PropertyPage>(config.api.properties.list, {
            params: toParams(input),
        }),

    bySeller: (sellerId: string, input: PropertyQuery = {}) =>
        query.get<PropertyPage>(config.api.properties.bySeller(sellerId), {
            params: toParams(input),
        }),

    detail: (id: string) =>
        query.get<Property>(config.api.properties.detail(id)),

    nearby: (id: string) =>
        query.get<NearbyPlace[]>(config.api.properties.nearby(id)),

    facets: (filters: PropertyQuery, options: FacetOptions) =>
        query.post<FacetCounts>(config.api.properties.facets, {
            filters: toParams(filters),
            options,
        }),

    create: (input: CreatePropertyInput) =>
        query.post<Property>(config.api.properties.list, input),

    update: (id: string, input: UpdatePropertyInput) =>
        query.patch<Property>(config.api.properties.detail(id), input),

    remove: (id: string) =>
        query.delete<Property>(config.api.properties.detail(id)),

    promote: (id: string, days: number) =>
        query.patch<Property>(config.api.properties.promote(id), { days }),

    markSold: (id: string) =>
        query.patch<Property>(config.api.properties.markSold(id)),

    moderate: (id: string, decision: ModerationDecision, note?: string) =>
        query.patch<Property>(config.api.properties.moderate(id), {
            decision,
            note,
        }),

    recordView: (id: string) =>
        query.post<{ recorded: boolean }>(config.api.properties.view(id)),

    removeImage: (id: string, imageId: string) =>
        query.delete<PropertyImage>(config.api.properties.image(id, imageId)),

    reorderImages: (id: string, ids: string[]) =>
        query.patch<PropertyImage[]>(config.api.properties.imageOrder(id), {
            ids,
        }),

    uploadImages: (
        id: string,
        files: File[],
        onProgress?: (percent: number) => void,
    ) => {
        const body = new FormData();
        files.forEach((file) => body.append("files", file));
        return query.post<PropertyImage[]>(
            config.api.properties.images(id),
            body,
            {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (event) => {
                    if (!onProgress || !event.total) return;
                    onProgress(
                        Math.round((event.loaded / event.total) * PERCENT),
                    );
                },
            },
        );
    },
};
