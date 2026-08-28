"use client";

import { useCallback, useMemo } from "react";
import {
    pendingCount,
    rankOffers,
    rankViewings,
    requestStats,
    requestsSummary,
} from "@/lib/data/agent-requests";
import { useIncomingConnections } from "@/lib/hooks/use-connections";
import { useRespondToOffer } from "@/lib/hooks/use-offers";
import { useCancelViewing, useConfirmViewing } from "@/lib/hooks/use-viewings";
import { toRequestBook } from "@/lib/utils/to-agent-request";
import type { RespondOfferInput } from "@/lib/validations/offer";

type OfferAnswer = Omit<RespondOfferInput, "status"> & {
    status: RespondOfferInput["status"];
};

export function useAgentRequests() {
    const connections = useIncomingConnections();
    const confirmViewing = useConfirmViewing();
    const cancelViewing = useCancelViewing();
    const respondToOffer = useRespondToOffer();

    const book = useMemo(
        () => toRequestBook(connections.data ?? []),
        [connections.data],
    );

    const viewings = useMemo(() => rankViewings(book.viewings), [book]);
    const offers = useMemo(() => rankOffers(book.offers), [book]);

    const confirm = useCallback(
        async (id: string, confirmedTime: string) => {
            try {
                await confirmViewing.mutateAsync({ id, confirmedTime });
                return true;
            } catch {
                return false;
            }
        },
        [confirmViewing],
    );

    const declineViewing = useCallback(
        async (id: string) => {
            try {
                await cancelViewing.mutateAsync(id);
                return true;
            } catch {
                return false;
            }
        },
        [cancelViewing],
    );

    const answerOffer = useCallback(
        async (id: string, answer: OfferAnswer) => {
            try {
                await respondToOffer.mutateAsync({ id, ...answer });
                return true;
            } catch {
                return false;
            }
        },
        [respondToOffer],
    );

    return {
        viewings,
        offers,
        stats: requestStats(book),
        summary: requestsSummary(book),
        waiting: pendingCount(book),
        pending: connections.isPending,
        failed: connections.isError,
        refetch: () => void connections.refetch(),
        confirmingId: confirmViewing.isPending
            ? (confirmViewing.variables?.id ?? null)
            : null,
        decliningId: cancelViewing.isPending
            ? (cancelViewing.variables ?? null)
            : null,
        answeringId: respondToOffer.isPending
            ? (respondToOffer.variables?.id ?? null)
            : null,
        answerFailed: respondToOffer.isError,
        confirm,
        declineViewing,
        answerOffer,
    };
}
