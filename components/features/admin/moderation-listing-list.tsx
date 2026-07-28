"use client";

import { ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { ModerationListingCard } from "@/components/features/admin/moderation-listing-card";
import type {
    DecisionMode,
    ModerationListing,
} from "@/lib/data/admin-listings";

export interface ModerationListingListProps {
    listings: ModerationListing[];
    selected: string[];
    onToggle: (id: string) => void;
    onApprove: (ids: string[]) => void;
    onDecision: (mode: DecisionMode, ids: string[]) => void;
}

export function ModerationListingList({
    listings,
    selected,
    onToggle,
    onApprove,
    onDecision,
}: ModerationListingListProps) {
    if (listings.length === 0) {
        return (
            <EmptyState
                icon={ShieldCheck}
                title="Queue is clear"
                description="No listings match this filter right now."
            />
        );
    }

    return (
        <div className="space-y-3">
            {listings.map((listing) => (
                <ModerationListingCard
                    key={listing.id}
                    listing={listing}
                    selected={selected.includes(listing.id)}
                    onToggle={onToggle}
                    onApprove={onApprove}
                    onDecision={onDecision}
                />
            ))}
        </div>
    );
}
