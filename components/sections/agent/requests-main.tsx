import { CalendarCheck, FileSignature } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { EmptyState } from "@/components/ui/empty-state";
import { ViewingRequestRow } from "@/components/features/agent/viewing-request-row";
import { OfferRequestRow } from "@/components/features/agent/offer-request-row";
import type { OfferResponseAction } from "@/lib/config/offer-response";
import { REQUESTS_COPY as COPY } from "@/lib/data/agent-requests";
import type { OfferRequestItem, ViewingRequestItem } from "@/lib/types";

export interface RequestsMainProps {
    viewings: ViewingRequestItem[];
    offers: OfferRequestItem[];
    confirmingId: string | null;
    busyViewingId: string | null;
    answeringId: string | null;
    onConfirmViewing: (id: string, confirmedTime: string) => void;
    onDeclineViewing: (id: string) => void;
    onAnswer: (action: OfferResponseAction, request: OfferRequestItem) => void;
}

export function RequestsMain({
    viewings,
    offers,
    confirmingId,
    busyViewingId,
    answeringId,
    onConfirmViewing,
    onDeclineViewing,
    onAnswer,
}: RequestsMainProps) {
    return (
        <div className="card-grid gap-3">
            <Panel
                title={COPY.viewingsTitle}
                description={COPY.viewingsLede}
                count={viewings.length}
            >
                {viewings.length > 0 ? (
                    <ul className="flex flex-col gap-2">
                        {viewings.map((request) => (
                            <ViewingRequestRow
                                key={request.id}
                                request={request}
                                confirming={confirmingId === request.id}
                                busy={busyViewingId === request.id}
                                onConfirm={onConfirmViewing}
                                onDecline={onDeclineViewing}
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
                count={offers.length}
            >
                {offers.length > 0 ? (
                    <ul className="flex flex-col gap-2">
                        {offers.map((request) => (
                            <OfferRequestRow
                                key={request.id}
                                request={request}
                                answering={answeringId === request.id}
                                onAccept={(item) => onAnswer("accept", item)}
                                onCounter={(item) => onAnswer("counter", item)}
                                onDecline={(item) => onAnswer("decline", item)}
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
    );
}

RequestsMain.displayName = "RequestsMain";
