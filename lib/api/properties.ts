import { query } from "@/lib/api/client";
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
import type { PropertyType } from "@/lib/enums/enums";

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

    markSold: (id: string) =>
        query.patch<Property>(config.api.properties.markSold(id)),

    recordView: (id: string) =>
        query.post<{ recorded: boolean }>(config.api.properties.view(id)),

    uploadImages: (id: string, files: File[]) => {
        const body = new FormData();
        files.forEach((file) => body.append("files", file));
        return query.post<PropertyImage[]>(
            config.api.properties.images(id),
            body,
            { headers: { "Content-Type": "multipart/form-data" } },
        );
    },
};
