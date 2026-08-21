"use client";

import { Panel } from "@/components/ui/panel";
import { DataTable } from "@/components/patterns/data-table";
import { buildComparisonConfig } from "@/components/features/offers/comparison-columns";
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
        <div className="console-split gap-3">
            <div className="console-span-2 space-y-3">
                <Panel
                    title="Offer Comparison"
                    description="Click any term to expand the detail"
                >
                    <DataTable
                        {...buildComparisonConfig()}
                        data={detail.comparison}
                    />
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

            <Panel title="Offer Timeline" count={timeline.length}>
                <TimelineList entries={timeline} />
            </Panel>
        </div>
    );
}
