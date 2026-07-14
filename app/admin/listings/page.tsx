import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Listing {
    id: string;
    address: string;
    agent: string;
    price: number;
    status: "approved" | "flagged" | "pending";
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

const getStatusColor = (status: string) => {
    switch (status) {
        case "approved":
            return "text-success bg-success/10 border-success/20";
        case "flagged":
            return "text-error bg-error/10 border-error/20";
        case "pending":
            return "text-warning bg-warning/10 border-warning/20";
        default:
            return "text-text-secondary";
    }
};

const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function AdminListingsPage() {
    const flaggedCount = listings.filter((l) => l.status === "flagged").length;
    const pendingCount = listings.filter((l) => l.status === "pending").length;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h3 font-display text-text font-light">
                        Content Moderation
                    </h1>
                    <p className="text-text-secondary mt-2">
                        {flaggedCount} flagged • {pendingCount} pending review
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="text-sm">
                        Filter
                    </Button>
                    <Button variant="secondary" className="text-sm">
                        Export
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {listings.map((listing) => (
                    <Card
                        key={listing.id}
                        className="hover:border-accent/50 transition-colors"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-start justify-between">
                                        <h3 className="text-h6 text-text font-light">
                                            {listing.address}
                                        </h3>
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(listing.status)}`}
                                        >
                                            {getStatusLabel(listing.status)}
                                        </span>
                                    </div>

                                    <div className="mb-4 flex items-center gap-4 text-sm">
                                        <span className="text-text-secondary">
                                            Agent: {listing.agent}
                                        </span>
                                        <span className="text-text-secondary">
                                            •
                                        </span>
                                        <span className="text-text font-medium">
                                            $
                                            {(listing.price / 1000000).toFixed(
                                                2,
                                            )}
                                            M
                                        </span>
                                    </div>

                                    {listing.reason && (
                                        <div className="bg-error/10 border-error/20 mb-4 rounded border p-3">
                                            <p className="text-error text-sm font-medium">
                                                Flagged Reason
                                            </p>
                                            <p className="text-error/70 mt-1 text-sm">
                                                {listing.reason}
                                            </p>
                                        </div>
                                    )}

                                    <p className="text-text-secondary text-xs">
                                        Submitted {listing.submittedDate}
                                    </p>
                                </div>

                                <div className="ml-6 flex flex-col gap-2">
                                    {listing.status === "pending" && (
                                        <>
                                            <Button
                                                variant="primary"
                                                className="w-32 text-sm"
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="text-error w-32 text-sm"
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                    {listing.status === "flagged" && (
                                        <>
                                            <Button
                                                variant="secondary"
                                                className="w-32 text-sm"
                                            >
                                                Review
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="text-error w-32 text-sm"
                                            >
                                                Remove
                                            </Button>
                                        </>
                                    )}
                                    {listing.status === "approved" && (
                                        <>
                                            <Button
                                                variant="secondary"
                                                className="w-32 text-sm"
                                            >
                                                View
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="w-32 text-sm"
                                            >
                                                Unpublish
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
