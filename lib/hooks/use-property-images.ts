"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertiesAPI } from "@/lib/api/properties";
import { queryKeys } from "@/lib/hooks/query-keys";
import { FEEDBACK } from "@/lib/config/feedback";

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
