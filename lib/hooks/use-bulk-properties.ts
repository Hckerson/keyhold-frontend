"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertiesAPI } from "@/lib/api/properties";
import { queryKeys } from "@/lib/hooks/query-keys";
import type { BulkStatusChange } from "@/lib/types";
import { FEEDBACK, GENERIC_FAILURE } from "@/lib/config/feedback";

const settleEvery = async (
    ids: readonly string[],
    run: (id: string) => Promise<unknown>,
) => {
    const results = await Promise.allSettled(ids.map(run));
    const failure = results.find(
        (result): result is PromiseRejectedResult =>
            result.status === "rejected",
    );
    if (!failure) return;
    throw failure.reason instanceof Error
        ? failure.reason
        : new Error(GENERIC_FAILURE);
};

export function useBulkUpdatePropertyStatus() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.bulkUpdatePropertyStatus,
        mutationFn: ({ ids, status }: BulkStatusChange) =>
            settleEvery(ids, (id) => propertiesAPI.update(id, { status })),
        onSettled: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}

export function useBulkDeleteProperties() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.bulkDeleteProperties,
        mutationFn: (ids: readonly string[]) =>
            settleEvery(ids, (id) => propertiesAPI.remove(id)),
        onSettled: () =>
            client.invalidateQueries({ queryKey: queryKeys.properties.all }),
    });
}
