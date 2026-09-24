"use client";

import { PortalHeader } from "@/components/patterns/portal-header";
import { StatBand } from "@/components/patterns/stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { RequestsMain } from "@/components/sections/agent/requests-main";
import {
    OfferResponseModal,
    type OfferResponse,
} from "@/components/features/agent/offer-response-modal";
import { ViewingDeclineModal } from "@/components/features/agent/viewing-decline-modal";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { OFFER_RESPONSE_STATUS } from "@/lib/config/offer-response";
import { REQUESTS_COPY as COPY } from "@/lib/data/agent-requests";
import { useAgentRequests } from "@/lib/hooks/use-agent-requests";

export function RequestsConsole() {
    const queue = useAgentRequests();
    const { answer, decline } = queue;

    if (queue.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentRequests}
                onRetry={queue.refetch}
            />
        );

    if (queue.pending) return <ConsoleSkeleton />;

    const submit = (response: OfferResponse) => {
        if (!answer.target) return;
        answer.confirm({
            id: answer.target.request.id,
            status: OFFER_RESPONSE_STATUS[answer.target.action],
            ...response,
        });
    };

    const confirmDecline = () => {
        if (decline.target) decline.confirm(decline.target);
    };

    return (
        <div className="flex flex-col gap-4">
            <PortalHeader title={COPY.title} lede={queue.summary} />

            <StatBand
                label={COPY.title}
                stats={queue.stats}
                pending={queue.pending}
            />

            <RequestsMain
                viewings={queue.viewings}
                offers={queue.offers}
                confirmingId={queue.confirmingId}
                busyViewingId={queue.busyViewingId}
                answeringId={queue.answeringId}
                onConfirmViewing={queue.confirm}
                onDeclineViewing={decline.request}
                onAnswer={(action, request) =>
                    answer.request({ action, request })
                }
            />

            <OfferResponseModal
                action={answer.target?.action ?? null}
                request={answer.target?.request}
                pending={answer.pending}
                failed={answer.failed}
                onClose={answer.dismiss}
                onSubmit={submit}
            />

            <ViewingDeclineModal
                request={queue.declining}
                pending={decline.pending}
                failed={decline.failed}
                onClose={decline.dismiss}
                onConfirm={confirmDecline}
            />
        </div>
    );
}

RequestsConsole.displayName = "RequestsConsole";
