"use client";

import { Panel } from "@/components/ui/panel";
import { ComparisonTable } from "@/components/features/offers/comparison-table";
import { CounterOfferPanel } from "@/components/features/offers/counter-offer-panel";
import { OfferMessagesPanel } from "@/components/features/offers/offer-messages-panel";
import { TimelineList } from "@/components/features/offers/timeline-list";
import type {
    OfferDetail,
    ThreadMessage,
    TimelineEntry,
} from "@/lib/data/offer-details";

export interface OfferDetailPanelsProps {
    detail: OfferDetail;
    offerPrice: number;
    timeline: TimelineEntry[];
    messages: ThreadMessage[];
    counterAmount: string;
    counterNote: string;
    closed: boolean;
    statusLabel: string;
    canSubmitCounter: boolean;
    onCounterAmountChange: (value: string) => void;
    onCounterNoteChange: (value: string) => void;
    onSubmitCounter: () => void;
    onSendMessage: (content: string) => void;
}

export function OfferDetailPanels({
    detail,
    offerPrice,
    timeline,
    messages,
    counterAmount,
    counterNote,
    closed,
    statusLabel,
    canSubmitCounter,
    onCounterAmountChange,
    onCounterNoteChange,
    onSubmitCounter,
    onSendMessage,
}: OfferDetailPanelsProps) {
    return (
        <div className="grid gap-3 lg:grid-cols-3">
            <div className="space-y-3 lg:col-span-2">
                <Panel
                    title="Offer Comparison"
                    description="Click any term to expand the detail"
                >
                    <ComparisonTable rows={detail.comparison} />
                </Panel>

                <CounterOfferPanel
                    offerPrice={offerPrice}
                    counterPrice={detail.counterPrice}
                    counterAmount={counterAmount}
                    counterNote={counterNote}
                    closed={closed}
                    statusLabel={statusLabel}
                    canSubmit={canSubmitCounter}
                    onCounterAmountChange={onCounterAmountChange}
                    onCounterNoteChange={onCounterNoteChange}
                    onSubmit={onSubmitCounter}
                />

                <OfferMessagesPanel
                    messages={messages}
                    onSend={onSendMessage}
                />
            </div>

            <Panel
                title="Offer Timeline"
                count={timeline.length}
                className="lg:col-span-1"
            >
                <TimelineList entries={timeline} />
            </Panel>
        </div>
    );
}
