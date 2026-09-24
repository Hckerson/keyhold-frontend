"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flagsAPI } from "@/lib/api/flags";
import { propertiesAPI } from "@/lib/api/properties";
import type { MutationFeedback } from "@/lib/config/feedback";
import type { ModerationDecision } from "@/lib/enums/enums";
import { queryKeys } from "@/lib/hooks/query-keys";
import type { ModerationTarget } from "@/lib/types";

export interface ModerateFlagInput {
    targets: ModerationTarget[];
    decision: ModerationDecision;
    note?: string;
}

export function useModerateFlag(feedback: MutationFeedback) {
    const client = useQueryClient();
    return useMutation({
        meta: feedback,
        mutationFn: async ({ targets, decision, note }: ModerateFlagInput) => {
            for (const { flagId, listingId } of targets) {
                await propertiesAPI.moderate(listingId, decision, note);
                await flagsAPI.resolve(flagId);
            }
        },
        onSettled: async () => {
            await Promise.all([
                client.invalidateQueries({
                    queryKey: queryKeys.properties.all,
                }),
                client.invalidateQueries({ queryKey: queryKeys.flags.all }),
            ]);
        },
    });
}
