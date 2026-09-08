"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { propertiesAPI, type FacetOptions } from "@/lib/api/properties";
import { queryKeys } from "@/lib/hooks/query-keys";
import type { ModerationDecision } from "@/lib/enums/enums";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreatePropertyInput,
    PropertyQuery,
    UpdatePropertyInput,
} from "@/lib/validations/property";
import type { PropertyStatus } from "@/lib/enums/enums";
import { FEEDBACK } from "@/lib/config/feedback";

export function useProperties(input: PropertyQuery = {}) {
    return useQuery({
        queryKey: queryKeys.properties.list(input),
        queryFn: () => propertiesAPI.list(input),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useSellerProperties(
    sellerId: string | undefined,
    input: PropertyQuery = {},
) {
    return useQuery({
        queryKey: queryKeys.properties.bySeller(sellerId ?? "", input),
        queryFn: () => propertiesAPI.bySeller(sellerId as string, input),
        enabled: Boolean(sellerId),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function usePropertyFacets(input: PropertyQuery, options: FacetOptions) {
    return useQuery({
        queryKey: queryKeys.properties.facets(input),
        queryFn: () => propertiesAPI.facets(input, options),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useProperty(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.properties.detail(id ?? ""),
        queryFn: () => propertiesAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useCreateProperty() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.createProperty,
        mutationFn: (input: CreatePropertyInput) => propertiesAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useUpdateProperty(id: string) {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.updateProperty,
        mutationFn: (input: UpdatePropertyInput) =>
            propertiesAPI.update(id, input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useUpdatePropertyStatus() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.updatePropertyStatus,
        mutationFn: ({ id, status }: { id: string; status: PropertyStatus }) =>
            propertiesAPI.update(id, { status }),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useDeleteProperty() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.deleteProperty,
        mutationFn: (id: string) => propertiesAPI.remove(id),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function usePromoteProperty() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.promoteProperty,
        mutationFn: ({ id, days }: { id: string; days: number }) =>
            propertiesAPI.promote(id, days),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useMarkPropertySold() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.markPropertySold,
        mutationFn: (id: string) => propertiesAPI.markSold(id),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useUploadPropertyImages(id: string) {
    const client = useQueryClient();
    const [progress, setProgress] = useState<number>();

    const mutation = useMutation({
        meta: FEEDBACK.uploadPropertyImages,
        mutationFn: (files: File[]) =>
            propertiesAPI.uploadImages(id, files, setProgress),
        onSettled: () => setProgress(undefined),
        onSuccess: () =>
            client.invalidateQueries({
                queryKey: queryKeys.properties.detail(id),
            }),
    });

    return { ...mutation, progress };
}

export function useDeletePropertyImage(id: string) {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.deletePropertyImage,
        mutationFn: (imageId: string) => propertiesAPI.removeImage(id, imageId),
        onSuccess: () =>
            client.invalidateQueries({
                queryKey: queryKeys.properties.detail(id),
            }),
    });
}

export function useReorderPropertyImages(id: string) {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.reorderPropertyImages,
        mutationFn: (ids: string[]) => propertiesAPI.reorderImages(id, ids),
        onSuccess: () =>
            client.invalidateQueries({
                queryKey: queryKeys.properties.detail(id),
            }),
    });
}

export function useModerateProperty() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.moderateProperty,
        mutationFn: ({
            id,
            decision,
            note,
        }: {
            id: string;
            decision: ModerationDecision;
            note?: string;
        }) => propertiesAPI.moderate(id, decision, note),
        onSuccess: async () => {
            await Promise.all([
                client.invalidateQueries({
                    queryKey: queryKeys.properties.all,
                }),
                client.invalidateQueries({ queryKey: queryKeys.flags.all }),
            ]);
        },
    });
}
