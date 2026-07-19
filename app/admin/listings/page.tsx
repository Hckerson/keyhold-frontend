import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Callout } from "@/components/ui/callout";
import type { BadgeTone } from "@/components/dashboard/contact-row";

type ListingStatus = "approved" | "flagged" | "pending";

interface Listing {
    id: string;
    address: string;
    agent: string;
    price: number;
    status: ListingStatus;
    reason?: string;
    submittedDate: string;
}

const listings: Listing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        agent: "Sarah Chen",
        price: 3200000,
        status: "approved",
        submittedDate: "2024-07-10",
    },
    {
        id: "2",
        address: "789 Sunset Blvd, West Hollywood, CA",
        agent: "Michael Rodriguez",
        price: 2950000,
        status: "flagged",
        reason: "Inappropriate listing image detected",
        submittedDate: "2024-07-12",
    },
    {
        id: "3",
        address: "234 Oak Street, Bel Air, CA",
        agent: "Jennifer Martinez",
        price: 4500000,
        status: "pending",
        submittedDate: "2024-07-13",
    },
];

const statusMeta: Record<ListingStatus, { tone: BadgeTone; label: string }> = {
    approved: { tone: "success", label: "Approved" },
    flagged: { tone: "error", label: "Flagged" },
    pending: { tone: "warning", label: "Pending" },
};

const actionsByStatus: Record<ListingStatus, [string, string]> = {
    pending: ["Approve", "Reject"],
    flagged: ["Review", "Remove"],
    approved: ["View", "Unpublish"],
};

export default function AdminModerationPage() {
    const flagged = listings.filter((l) => l.status === "flagged").length;
    const pending = listings.filter((l) => l.status === "pending").length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Content Moderation"
                description={`${flagged} flagged · ${pending} pending review`}
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                            Filter
                        </Button>
                        <Button variant="secondary" size="sm">
                            Export
                        </Button>
                    </div>
                }
            />

            <div className="space-y-4">
                {listings.map((listing) => {
                    const meta = statusMeta[listing.status];
                    const [primary, danger] = actionsByStatus[listing.status];
                    return (
                        <article
                            key={listing.id}
                            className="bg-background-muted border-border-light hover:border-border ease-smooth rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md"
                        >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-text truncate text-sm font-medium">
                                            {listing.address}
                                        </h3>
                                        <StatusBadge tone={meta.tone}>
                                            {meta.label}
                                        </StatusBadge>
                                    </div>

                                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                                        <span className="text-text-secondary">
                                            Agent · {listing.agent}
                                        </span>
                                        <span className="text-text-muted">
                                            ·
                                        </span>
                                        <span className="text-text font-medium tabular-nums">
                                            $
                                            {(
                                                listing.price / 1_000_000
                                            ).toFixed(2)}
                                            M
                                        </span>
                                        <span className="text-text-muted">
                                            ·
                                        </span>
                                        <span className="text-text-muted">
                                            Submitted {listing.submittedDate}
                                        </span>
                                    </div>

                                    {listing.reason && (
                                        <Callout
                                            variant="error"
                                            title="Flagged reason"
                                            description={listing.reason}
                                            className="mt-3"
                                        />
                                    )}
                                </div>

                                <div className="flex shrink-0 gap-2 sm:flex-col">
                                    <Button
                                        variant={
                                            listing.status === "pending"
                                                ? "primary"
                                                : "secondary"
                                        }
                                        size="sm"
                                        className="w-full sm:w-28"
                                    >
                                        {primary}
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="w-full sm:w-28"
                                    >
                                        {danger}
                                    </Button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
