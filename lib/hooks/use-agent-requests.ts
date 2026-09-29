"use client";

import { useMemo } from "react";
import type { OfferResponseAction } from "@/lib/config/offer-response";
import {
    pendingCount,
    rankOffers,
    rankViewings,
    requestStats,
    requestsSummary,
} from "@/lib/data/agent-requests";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useIncomingConnections } from "@/lib/hooks/use-connections";
import { useRespondToOffer } from "@/lib/hooks/use-offers";
import { useConfirmViewing, useDeclineViewing } from "@/lib/hooks/use-viewings";
import { toRequestBook } from "@/lib/utils/to-agent-request";
import type { OfferRequestItem } from "@/lib/types";
import type { RespondOfferInput } from "@/lib/validations/offer";

interface OfferAnswering {
    action: OfferResponseAction;
    request: OfferRequestItem;
}

export function useAgentRequests() {
    const connections = useIncomingConnections();
    const confirmViewing = useConfirmViewing();
    const declineViewing = useDeclineViewing();
    const respondToOffer = useRespondToOffer();

    const answer = useConfirmation<
        RespondOfferInput & { id: string },
        OfferAnswering
    >(respondToOffer);
    const decline = useConfirmation<string>(declineViewing);
    const confirmation = useConfirmation<{
        id: string;
        confirmedTime: string;
    }>(confirmViewing);

    const book = useMemo(
        () => toRequestBook(connections.data ?? []),
        [connections.data],
    );

    const viewings = useMemo(() => rankViewings(book.viewings), [book]);
    const offers = useMemo(() => rankOffers(book.offers), [book]);

    const busyViewingId = confirmViewing.isPending
        ? (confirmViewing.variables?.id ?? null)
        : declineViewing.isPending
          ? (declineViewing.variables ?? null)
          : null;

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
        busyViewingId,
        answeringId: respondToOffer.isPending
            ? (respondToOffer.variables?.id ?? null)
            : null,
        confirmation,
        answer,
        decline,
        declining: viewings.find((request) => request.id === decline.target),
        confirmingRequest: viewings.find(
            (request) => request.id === confirmation.target?.id,
        ),
    };
}
