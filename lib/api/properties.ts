import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreatePropertyInput,
    Property,
    PropertyImage,
    PropertyPage,
    PropertyQuery,
    UpdatePropertyInput,
} from "@/lib/validations/property";

const toParams = (input: PropertyQuery) =>
    Object.fromEntries(
        Object.entries(input).filter(
            ([, value]) => value !== undefined && value !== "",
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
