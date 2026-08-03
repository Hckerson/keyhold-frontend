"use client";

import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { VerificationTierPath } from "@/components/features/admin/verification-tier-path";
import {
    statusMeta,
    type VerificationRequest,
} from "@/lib/data/admin-verifications";
import { cn, initialsOf } from "@/lib/utils";

export interface VerificationQueueRowProps {
    request: VerificationRequest;
    selected: boolean;
    onSelect: (id: string) => void;
}

export function VerificationQueueRow({
    request,
    selected,
    onSelect,
}: VerificationQueueRowProps) {
    const meta = statusMeta[request.status];
    const outstanding = request.documents.filter(
        (document) => document.state !== "verified",
    ).length;

    return (
        <button
            type="button"
            aria-current={selected}
            onClick={() => onSelect(request.id)}
            className={cn(
                "ease-smooth focus-visible:ring-accent flex w-full items-center gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                selected
                    ? "border-l-accent bg-accent-light"
                    : "hover:bg-background-alt border-l-transparent",
            )}
        >
            <Avatar
                size="xs"
                tone="accent"
                elevated={false}
                initials={initialsOf(request.name)}
            />

            <div className="min-w-0 flex-1">
                <p className="text-text truncate text-xs font-semibold">
                    {request.name}
                </p>
                <VerificationTierPath
                    from={request.currentTier}
                    to={request.requestedTier}
                    className="mt-1"
                />
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
                <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
                <p
                    className={cn(
                        "font-mono text-[10px] tracking-wide tabular-nums",
                        outstanding > 0 ? "text-warning" : "text-text-muted",
                    )}
                >
                    {outstanding > 0
                        ? `${outstanding} open`
                        : `${request.documents.length} docs`}
                </p>
            </div>
        </button>
    );
}

VerificationQueueRow.displayName = "VerificationQueueRow";
