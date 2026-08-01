"use client";

import { Check, ImageOff, PenLine, X } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import {
    checkMeta,
    type CheckState,
    type ComplianceCheck,
    type DecisionMode,
    type ModerationAgent,
    type ModerationListing,
} from "@/lib/data/admin-listings";
import { cn } from "@/lib/utils";

const OPEN_STATES: CheckState[] = ["fail", "warn"];

const splitAddress = (address: string) => {
    const separator = address.indexOf(",");
    if (separator === -1) return { street: address, locality: "" };
    return {
        street: address.slice(0, separator),
        locality: address.slice(separator + 1).trim(),
    };
};

export function ListingCell({ listing }: { listing: ModerationListing }) {
    const { street, locality } = splitAddress(listing.address);
    const [cover] = listing.images;

    return (
        <div className="flex items-center gap-2.5">
            <span className="border-border-light bg-background-alt grid h-10 w-14 shrink-0 place-items-center overflow-hidden rounded-sm border">
                {cover ? (
                    <img
                        src={cover}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <ImageOff
                        size={12}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="text-text-muted"
                    />
                )}
            </span>

            <div className="min-w-0">
                <p className="text-text truncate text-xs font-medium">
                    {street}
                </p>
                <p className="text-text-muted mt-0.5 flex items-center gap-1.5 text-[10px]">
                    {locality && (
                        <>
                            <span className="truncate">{locality}</span>
                            <span
                                aria-hidden="true"
                                className="text-border-dark"
                            >
                                ·
                            </span>
                        </>
                    )}
                    <span className="font-mono tracking-wide whitespace-nowrap tabular-nums">
                        {listing.images.length} photos
                    </span>
                </p>
            </div>
        </div>
    );
}

export function AgentCell({ agent }: { agent: ModerationAgent }) {
    const firm = agent.email.slice(agent.email.indexOf("@") + 1);

    return (
        <div className="min-w-0">
            <p className="text-text-secondary truncate text-xs">{agent.name}</p>
            <p className="text-text-muted mt-0.5 truncate text-[10px]">
                {firm}
            </p>
        </div>
    );
}

export interface ModerationRowActionsProps {
    listing: ModerationListing;
    onApprove: (id: string) => void;
    onDecision: (mode: DecisionMode, id: string) => void;
}

export function ModerationRowActions({
    listing,
    onApprove,
    onDecision,
}: ModerationRowActionsProps) {
    const actions = [
        {
            id: "approve",
            label: `Approve ${listing.address}`,
            icon: Check,
            cls: "hover:text-success",
            hidden: listing.status === "approved",
            run: () => onApprove(listing.id),
        },
        {
            id: "changes",
            label: `Request changes on ${listing.address}`,
            icon: PenLine,
            cls: "hover:text-warning",
            hidden: false,
            run: () => onDecision("changes", listing.id),
        },
        {
            id: "reject",
            label: `Reject ${listing.address}`,
            icon: X,
            cls: "hover:text-error",
            hidden: listing.status === "rejected",
            run: () => onDecision("reject", listing.id),
        },
    ];

    return (
        <div className="flex items-center justify-end gap-0.5">
            {actions
                .filter((action) => !action.hidden)
                .map((action) => (
                    <button
                        key={action.id}
                        type="button"
                        title={action.label}
                        aria-label={action.label}
                        onClick={action.run}
                        className={cn(
                            "text-text-muted hover:bg-background focus-visible:ring-accent ease-smooth grid size-6 place-items-center rounded-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                            action.cls,
                        )}
                    >
                        <action.icon
                            size={12}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </button>
                ))}
        </div>
    );
}

export function ComplianceCell({ checks }: { checks: ComplianceCheck[] }) {
    const open = OPEN_STATES.map((state) => ({
        state,
        count: checks.filter((check) => check.state === state).length,
    })).filter((entry) => entry.count > 0);

    if (open.length === 0) {
        const ClearIcon = checkMeta.pass.icon;
        return (
            <span className="text-success inline-flex items-center gap-1 text-[10px] font-medium">
                <ClearIcon size={12} strokeWidth={1.5} aria-hidden="true" />
                Clear
            </span>
        );
    }

    return (
        <div className="flex items-center gap-1">
            {open.map(({ state, count }) => (
                <StatusBadge
                    key={state}
                    tone={checkMeta[state].tone}
                    icon={checkMeta[state].icon}
                >
                    <span className="tabular-nums">{count}</span>
                    <span className="sr-only"> {checkMeta[state].noun}</span>
                </StatusBadge>
            ))}
        </div>
    );
}
