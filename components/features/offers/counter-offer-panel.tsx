"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Panel } from "@/components/ui/panel";
import { FormField } from "@/components/ui/forms/form-field";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import { formatCurrencyInput, formatUsd } from "@/lib/utils";

export interface CounterOfferPanelProps {
    offerPrice: number;
    counterPrice?: number;
    counterAmount: string;
    counterNote: string;
    closed: boolean;
    statusLabel: string;
    canSubmit: boolean;
    onCounterAmountChange: (value: string) => void;
    onCounterNoteChange: (value: string) => void;
    onSubmit: () => void;
}

export function CounterOfferPanel({
    offerPrice,
    counterPrice,
    counterAmount,
    counterNote,
    closed,
    statusLabel,
    canSubmit,
    onCounterAmountChange,
    onCounterNoteChange,
    onSubmit,
}: CounterOfferPanelProps) {
    return (
        <Panel title="Counter Offer" description="Respond with new terms">
            <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="border-border-light bg-background rounded-lg border p-3">
                        <p className="micro-label">Your Current Offer</p>
                        <p className="text-text mt-0.5 text-xs font-medium tabular-nums">
                            {formatUsd(offerPrice)}
                        </p>
                    </div>
                    <div className="border-border-light bg-background rounded-lg border p-3">
                        <p className="micro-label">Seller&rsquo;s Counter</p>
                        <p className="font-display text-accent mt-0.5 text-lg font-light tabular-nums">
                            {counterPrice === undefined
                                ? "—"
                                : formatUsd(counterPrice)}
                        </p>
                    </div>
                </div>

                <FormField
                    id="counter-amount"
                    name="counterAmount"
                    label="Your new counter"
                    variant="numeric"
                    inputMode="numeric"
                    placeholder="$0"
                    value={counterAmount}
                    disabled={closed}
                    onChange={(event) =>
                        onCounterAmountChange(
                            formatCurrencyInput(event.target.value),
                        )
                    }
                />

                <TextareaField
                    id="counter-note"
                    name="counterNote"
                    label="Message to seller"
                    rows={3}
                    placeholder="Explain the terms behind your counter…"
                    value={counterNote}
                    disabled={closed}
                    onChange={(event) =>
                        onCounterNoteChange(event.target.value)
                    }
                />

                {closed && (
                    <Callout
                        variant="info"
                        title={`This offer is ${statusLabel.toLowerCase()}`}
                        description="No further counters can be submitted."
                    />
                )}

                <Button
                    variant="primary"
                    size="sm"
                    disabled={!canSubmit}
                    onClick={onSubmit}
                >
                    Submit Counter
                </Button>
            </div>
        </Panel>
    );
}
