"use client";

import { useState } from "react";
import { CalendarX } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChoiceChips } from "@/components/patterns/choice-chips";
import { StatusDot } from "@/components/patterns/status-dot";
import { VIEWING_MODES } from "@/lib/config/viewing-tones";
import {
    REQUESTS_COPY as COPY,
    confirmableTimes,
    isStale,
    waitedLabel,
} from "@/lib/data/agent-requests";
import type { ViewingRequestItem } from "@/lib/types";
import { dateFormatter } from "@/lib/utils/date-formatter";
import { initialsOf } from "@/lib/utils";

const SLOT_DAY = "EEE d MMM";
const SLOT_TIME = "HH:mm";
const CONFIRM = "Confirm";
const DECLINE = "Decline";
const SLOTS_LABEL = "Times the buyer proposed";

export interface ViewingRequestRowProps {
    request: ViewingRequestItem;
    confirming: boolean;
    busy: boolean;
    onConfirm: (id: string, confirmedTime: string) => void;
    onDecline: (id: string) => void;
}

export function ViewingRequestRow({
    request,
    confirming,
    busy,
    onConfirm,
    onDecline,
}: ViewingRequestRowProps) {
    const slots = confirmableTimes(request);
    const [picked, setPicked] = useState(slots[0] ?? "");
    const stale = isStale(request);
    const mode = VIEWING_MODES[request.mode];

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
                    <StatusDot tone={stale ? "error" : "warning"} />
                    {waitedLabel(request.minutesAgo)}
                </span>
            </div>

            <p className="text-text-secondary flex items-center gap-1.5 text-xs">
                <mode.icon
                    className="text-text-muted size-3 shrink-0"
                    strokeWidth={1.5}
                />
                {mode.label} · {request.durationMinutes} min
            </p>

            {stale ? (
                <div className="border-border-light bg-background-muted flex items-center gap-1.5 rounded-md border p-2.5">
                    <CalendarX
                        className="text-error size-3 shrink-0"
                        strokeWidth={1.5}
                    />
                    <p className="text-text-secondary text-xs">{COPY.stale}</p>
                </div>
            ) : (
                <ChoiceChips
                    label={SLOTS_LABEL}
                    choices={slots.map((at) => ({
                        id: at,
                        label: dateFormatter(at, SLOT_DAY),
                        caption: dateFormatter(at, SLOT_TIME),
                    }))}
                    selected={[picked]}
                    onToggle={setPicked}
                />
            )}

            <div className="flex items-center justify-end gap-2">
                <Button
                    type="button"
                    disabled={busy}
                    onClick={() => onDecline(request.id)}
                >
                    {DECLINE}
                </Button>
                {!stale && (
                    <Button
                        type="button"
                        emphasis="solid"
                        tone="accent"
                        isLoading={confirming}
                        disabled={busy || !picked}
                        onClick={() => onConfirm(request.id, picked)}
                    >
                        {CONFIRM}
                    </Button>
                )}
            </div>
        </li>
    );
}

ViewingRequestRow.displayName = "ViewingRequestRow";
