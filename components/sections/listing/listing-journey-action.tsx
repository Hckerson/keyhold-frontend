"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PropertyAction } from "@/lib/types";

export interface ListingJourneyActionProps {
    action: PropertyAction;
    variant: "primary" | "secondary";
    pending?: boolean;
    onRun: () => void;
}

export function ListingJourneyAction({
    action,
    variant,
    pending = false,
    onRun,
}: ListingJourneyActionProps) {
    if (action.kind === "track" && action.href)
        return (
            <Link href={action.href} className="block">
                <Button variant={variant} size="sm" className="w-full">
                    {action.label}
                </Button>
            </Link>
        );

    return (
        <Button
            type="button"
            variant={variant}
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
