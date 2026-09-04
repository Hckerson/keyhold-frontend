"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PropertyAction } from "@/lib/types";

const ACTION_RANK = {
    primary: { emphasis: "solid", tone: "accent" },
    secondary: { emphasis: "outline", tone: "neutral" },
} as const;

export interface ListingJourneyActionProps {
    action: PropertyAction;
    variant: keyof typeof ACTION_RANK;
    pending?: boolean;
    onRun: () => void;
}

export function ListingJourneyAction({
    action,
    variant,
    pending = false,
    onRun,
}: ListingJourneyActionProps) {
    const rank = ACTION_RANK[variant];

    if (action.kind === "track" && action.href)
        return (
            <Button asChild {...rank} size="sm" className="w-full">
                <Link href={action.href}>{action.label}</Link>
            </Button>
        );

    return (
        <Button
            type="button"
            {...rank}
            size="sm"
            className="w-full"
            isLoading={pending}
            disabled={action.kind === "none"}
            onClick={onRun}
        >
            {action.label}
        </Button>
    );
}

ListingJourneyAction.displayName = "ListingJourneyAction";
