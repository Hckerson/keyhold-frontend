"use client";

import { useState } from "react";
import { CalendarCheck, FileSignature } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { EmptyState } from "@/components/ui/empty-state";
import { PortalHeader } from "@/components/patterns/portal-header";
import { StatBand } from "@/components/patterns/stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ViewingRequestRow } from "@/components/features/agent/viewing-request-row";
import { OfferRequestRow } from "@/components/features/agent/offer-request-row";
import {
    OfferResponseModal,
    type OfferResponse,
} from "@/components/features/agent/offer-response-modal";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    OFFER_RESPONSE_STATUS,
    type OfferResponseAction,
} from "@/lib/config/offer-response";
import { REQUESTS_COPY as COPY } from "@/lib/data/agent-requests";
import { useAgentRequests } from "@/lib/hooks/use-agent-requests";
import type { OfferRequestItem } from "@/lib/types";

interface Answering {
    action: OfferResponseAction;
    request: OfferRequestItem;
}

export function RequestsConsole() {
    const queue = useAgentRequests();
    const [answering, setAnswering] = useState<Answering | null>(null);

    if (queue.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentRequests}
                onRetry={queue.refetch}
            />
        );

    if (queue.pending) return <ConsoleSkeleton />;

    const submit = (response: OfferResponse) => {
        if (!answering) return;
        void queue
            .answerOffer(answering.request.id, {
                status: OFFER_RESPONSE_STATUS[answering.action],
                ...response,
            })
            .then((done) => {
                if (done) setAnswering(null);
            });
    };

    return (
        <div className="flex flex-col gap-4">
            <PortalHeader title={COPY.title} lede={queue.summary} />

            <StatBand
                label={COPY.title}
                stats={queue.stats}
                pending={queue.pending}
            />

            <div className="card-grid gap-3">
                <Panel
                    title={COPY.viewingsTitle}
                    description={COPY.viewingsLede}
                    count={queue.viewings.length}
                >
                    {queue.viewings.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {queue.viewings.map((request) => (
                                <ViewingRequestRow
                                    key={request.id}
                                    request={request}
                                    confirming={
                                        queue.confirmingId === request.id
                                    }
                                    declining={queue.decliningId === request.id}
                                    onConfirm={(id, at) => {
                                        void queue.confirm(id, at);
                                    }}
                                    onDecline={(id) => {
                                        void queue.declineViewing(id);
                                    }}
                                />
                            ))}
                        </ul>
                    ) : (
                        <EmptyState
                            icon={CalendarCheck}
                            title={COPY.viewingsEmpty}
                            description={COPY.viewingsEmptyLede}
                        />
                    )}
                </Panel>

                <Panel
                    title={COPY.offersTitle}
                    description={COPY.offersLede}
                    count={queue.offers.length}
                >
                    {queue.offers.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {queue.offers.map((request) => (
                                <OfferRequestRow
                                    key={request.id}
                                    request={request}
                                    answering={queue.answeringId === request.id}
                                    onAccept={(item) =>
                                        setAnswering({
                                            action: "accept",
                                            request: item,
                                        })
                                    }
                                    onCounter={(item) =>
                                        setAnswering({
                                            action: "counter",
                                            request: item,
                                        })
                                    }
                                    onDecline={(item) =>
                                        setAnswering({
                                            action: "decline",
                                            request: item,
                                        })
                                    }
                                />
                            ))}
                        </ul>
                    ) : (
                        <EmptyState
                            icon={FileSignature}
                            title={COPY.offersEmpty}
                            description={COPY.offersEmptyLede}
                        />
                    )}
                </Panel>
            </div>

            <OfferResponseModal
                action={answering?.action ?? null}
                request={answering?.request}
                pending={queue.answeringId !== null}
                failed={queue.answerFailed}
                onClose={() => setAnswering(null)}
                onSubmit={submit}
            />
        </div>
    );
}

RequestsConsole.displayName = "RequestsConsole";
