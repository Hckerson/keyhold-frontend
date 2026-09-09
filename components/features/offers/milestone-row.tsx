"use client";

import { useRef } from "react";
import { Paperclip, Check, Undo2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { IconButton } from "@/components/ui/icon-button";
import { chartToneSoft } from "@/lib/config/chart-tones";
import {
    MILESTONE_KINDS_META,
    MILESTONE_STATUSES_META,
} from "@/lib/config/contingency-tones";
import { MESSAGE_ATTACHMENTS } from "@/lib/config/message-attachments";
import {
    MILESTONE_COPY as COPY,
    isOverdue,
    milestoneDate,
} from "@/lib/data/offer-milestones";
import type { MilestoneKind } from "@/lib/enums/enums";
import { cn, formatCompactUsd } from "@/lib/utils";
import type { DealMilestone } from "@/lib/validations/offer";

const OVERDUE_LABEL = "Overdue";

export interface MilestoneRowProps {
    milestone: DealMilestone;
    busy: boolean;
    onDateChange: (kind: MilestoneKind, date: string) => void;
    onToggleComplete: (milestone: DealMilestone) => void;
    onAttach: (kind: MilestoneKind, file: File) => void;
}

export function MilestoneRow({
    milestone,
    busy,
    onDateChange,
    onToggleComplete,
    onAttach,
}: MilestoneRowProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const meta = MILESTONE_KINDS_META[milestone.kind];
    const status = MILESTONE_STATUSES_META[milestone.status];
    const overdue = isOverdue(milestone);
    const waived = milestone.status === "WAIVED";
    const done = milestone.status === "COMPLETED";
    const Icon = meta.icon;

    return (
        <li className="flex h-11 items-center gap-2">
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[status.chartTone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>

            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {meta.label}
            </span>

            {milestone.appraisedValue !== null && (
                <span className="text-text-secondary w-16 shrink-0 text-right text-xs tabular-nums">
                    {formatCompactUsd(milestone.appraisedValue)}
                </span>
            )}

            <StatusBadge tone={overdue ? "error" : status.tone}>
                {overdue ? OVERDUE_LABEL : status.label}
            </StatusBadge>

            <label className="w-28 shrink-0">
                <span className="sr-only">
                    {COPY.due} {meta.label}
                </span>
                <input
                    type="date"
                    disabled={busy || waived}
                    value={milestone.dueAt?.slice(0, 10) ?? ""}
                    onChange={(event) =>
                        onDateChange(milestone.kind, event.target.value)
                    }
                    className="text-text-secondary border-border-light focus-visible:border-accent ease-smooth h-7 w-full rounded-sm border bg-transparent px-1.5 text-xs tabular-nums transition-colors focus-visible:outline-none disabled:opacity-50"
                />
            </label>

            {milestone.documentUrl ? (
                <a
                    href={milestone.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={milestone.documentName ?? COPY.attach}
                    className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth grid size-7 shrink-0 place-items-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                    <Paperclip
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </a>
            ) : (
                <IconButton
                    type="button"
                    icon={Paperclip}
                    size="md"
                    label={`${COPY.attach} ${meta.label}`}
                    disabled={busy || waived}
                    onClick={() => fileRef.current?.click()}
                />
            )}

            <input
                ref={fileRef}
                type="file"
                accept={MESSAGE_ATTACHMENTS.accept}
                className="sr-only"
                aria-label={`${COPY.attach} ${meta.label}`}
                onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (file) onAttach(milestone.kind, file);
                }}
            />

            <IconButton
                type="button"
                icon={done ? Undo2 : Check}
                size="md"
                tone={done ? "neutral" : "success"}
                label={`${done ? COPY.reopen : COPY.complete} ${meta.label}`}
                disabled={busy || waived}
                onClick={() => onToggleComplete(milestone)}
            />

            <span className="micro-label w-16 shrink-0 text-right">
                {milestoneDate(milestone.completedAt ?? milestone.dueAt)}
            </span>
        </li>
    );
}

MilestoneRow.displayName = "MilestoneRow";
