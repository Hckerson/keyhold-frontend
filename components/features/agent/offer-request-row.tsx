"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/patterns/status-dot";
import {
    expiryLabel,
    isExpired,
    isUrgent,
    offerBand,
    waitedLabel,
} from "@/lib/data/agent-requests";
import type { OfferRequestItem } from "@/lib/types";
import { formatUsd, initialsOf } from "@/lib/utils";

const ASK = "Ask";
const ACCEPT = "Accept";
const COUNTER = "Counter";
const DECLINE = "Decline";

export interface OfferRequestRowProps {
    request: OfferRequestItem;
    answering: boolean;
    onAccept: (request: OfferRequestItem) => void;
    onCounter: (request: OfferRequestItem) => void;
    onDecline: (request: OfferRequestItem) => void;
}

export function OfferRequestRow({
    request,
    answering,
    onAccept,
    onCounter,
    onDecline,
}: OfferRequestRowProps) {
    const band = offerBand(request);
    const expired = isExpired(request);

    return (
        <li className="border-border-light bg-background flex flex-col gap-2.5 rounded-lg border p-3">
            <div className="flex min-w-0 items-center gap-2">
                <Avatar
                    size="xs"
                    elevated={false}
                    src={request.buyerAvatar ?? ""}
                    alt={request.buyerName}
                    initials={initialsOf(request.buyerName)}
                    className="text-[10px]"
                />
                <div className="min-w-0 flex-1">
                    <p className="text-text truncate text-xs font-medium">
                        {request.buyerName}
                    </p>
                    <p className="text-text-secondary truncate text-xs">
                        {request.address}, {request.locality}
                    </p>
                </div>
                <span className="text-text-muted flex shrink-0 items-center gap-1.5 text-xs tabular-nums">
                    <StatusDot
                        tone={
                            expired
                                ? "error"
                                : isUrgent(request)
                                  ? "warning"
                                  : "neutral"
                        }
                    />
                    {expiryLabel(request)}
                </span>
            </div>

            <div className="border-border-light bg-background-muted flex items-baseline justify-between gap-3 rounded-md border p-2.5">
                <div className="min-w-0">
                    <p className="text-text text-h6 font-display leading-none font-light tabular-nums">
                        {formatUsd(request.offeredPrice)}
                    </p>
                    <p className="text-text-muted mt-1 text-xs tabular-nums">
                        {ASK} {formatUsd(request.listPrice)}
                    </p>
                </div>
                <span className="text-text-secondary shrink-0 text-right text-xs">
                    {band.label}
                </span>
            </div>

            <p className="text-text-secondary text-xs">
                {request.offeredTerms}
            </p>

            <div className="flex items-center justify-between gap-2">
                <span className="text-text-muted text-xs tabular-nums">
                    {waitedLabel(request.minutesAgo)}
                </span>
                <span className="flex items-center gap-2">
                    <Button
                        type="button"
                        disabled={answering}
                        onClick={() => onDecline(request)}
                    >
                        {DECLINE}
                    </Button>
                    <Button
                        type="button"
                        disabled={answering || expired}
                        onClick={() => onCounter(request)}
                    >
                        {COUNTER}
                    </Button>
                    <Button
                        type="button"
                        emphasis="solid"
                        tone="accent"
                        isLoading={answering}
                        disabled={expired}
                        onClick={() => onAccept(request)}
                    >
                        {ACCEPT}
                    </Button>
                </span>
            </div>
        </li>
    );
}

OfferRequestRow.displayName = "OfferRequestRow";
