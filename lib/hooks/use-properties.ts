"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { propertiesAPI } from "@/lib/api/properties";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreatePropertyInput,
    PropertyQuery,
    UpdatePropertyInput,
} from "@/lib/validations/property";

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
        mutationFn: (input: CreatePropertyInput) => propertiesAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useUpdateProperty(id: string) {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (input: UpdatePropertyInput) =>
            propertiesAPI.update(id, input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useDeleteProperty() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => propertiesAPI.remove(id),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useMarkPropertySold() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => propertiesAPI.markSold(id),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useUploadPropertyImages(id: string) {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (files: File[]) => propertiesAPI.uploadImages(id, files),
        onSuccess: () =>
            client.invalidateQueries({
                queryKey: queryKeys.properties.detail(id),
            }),
    });
}
