import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VerificationRequest {
    id: string;
    name: string;
    email: string;
    requestedTier: "premium" | "platinum";
    currentTier: "standard" | "premium";
    status: "pending" | "approved" | "rejected";
    submittedDate: string;
    documents: number;
}

const verifications: VerificationRequest[] = [
    {
        id: "1",
        name: "Robert Chen",
        email: "robert@example.com",
        requestedTier: "platinum",
        currentTier: "premium",
        status: "pending",
        submittedDate: "2024-07-13",
        documents: 4,
    },
    {
        id: "2",
        name: "Sophia Laurent",
        email: "sophia@example.com",
        requestedTier: "premium",
        currentTier: "standard",
        status: "pending",
        submittedDate: "2024-07-12",
        documents: 3,
    },
    {
        id: "3",
        name: "Marcus Sterling",
        email: "marcus@example.com",
        requestedTier: "premium",
        currentTier: "standard",
        status: "approved",
        submittedDate: "2024-07-05",
        documents: 3,
    },
    {
        id: "4",
        name: "Jennifer Martinez",
        email: "jennifer@example.com",
        requestedTier: "platinum",
        currentTier: "premium",
        status: "rejected",
        submittedDate: "2024-06-28",
        documents: 2,
    },
];

const getTierColor = (tier: string) => {
    switch (tier) {
        case "platinum":
            return "text-accent";
        case "premium":
            return "text-info";
        case "standard":
            return "text-text-secondary";
        default:
            return "text-text-secondary";
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "text-warning bg-warning/10 border-warning/20";
        case "approved":
            return "text-success bg-success/10 border-success/20";
        case "rejected":
            return "text-error bg-error/10 border-error/20";
        default:
            return "text-text-secondary";
    }
};

const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function AdminVerificationsPage() {
    const pendingCount = verifications.filter(
        (v) => v.status === "pending",
    ).length;
    const approvedCount = verifications.filter(
        (v) => v.status === "approved",
    ).length;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h3 font-display text-text font-light">
                        Tier Verifications
                    </h1>
                    <p className="text-text-secondary mt-2">
                        {pendingCount} pending • {approvedCount} approved
                    </p>
                </div>
                <Button variant="secondary" className="text-sm">
                    Export Report
                </Button>
            </div>

            <div className="space-y-4">
                {verifications.map((request) => (
                    <Card
                        key={request.id}
                        className="hover:border-accent/50 transition-colors"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div>
                                            <h3 className="text-h6 text-text font-light">
                                                {request.name}
                                            </h3>
                                            <p className="text-text-secondary mt-1 text-sm">
                                                {request.email}
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(request.status)}`}
                                        >
                                            {getStatusLabel(request.status)}
                                        </span>
                                    </div>

                                    <div className="border-border grid grid-cols-1 gap-6 border-y py-4 md:grid-cols-4">
                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Current Tier
                                            </p>
                                            <p
                                                className={`text-sm font-medium ${getTierColor(request.currentTier)}`}
                                            >
                                                {request.currentTier
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    request.currentTier.slice(
                                                        1,
                                                    )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Requested Tier
                                            </p>
                                            <p
                                                className={`text-sm font-medium ${getTierColor(request.requestedTier)}`}
                                            >
                                                {request.requestedTier
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    request.requestedTier.slice(
                                                        1,
                                                    )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Documents
                                            </p>
                                            <p className="text-text text-sm font-medium">
                                                {request.documents} submitted
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Submitted
                                            </p>
                                            <p className="text-text text-sm font-medium">
                                                {request.submittedDate}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-sm">
                                            <span className="text-text-secondary">
                                                Verification Type:{" "}
                                            </span>
                                            <span className="text-text font-medium">
                                                {request.requestedTier ===
                                                "platinum"
                                                    ? "High-value buyer/agent"
                                                    : "Professional agent"}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-6 flex flex-col gap-2">
                                    {request.status === "pending" && (
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
                                            <Button
                                                variant="secondary"
                                                className="w-32 text-sm"
                                            >
                                                Review Docs
                                            </Button>
                                        </>
                                    )}
                                    {request.status === "approved" && (
                                        <>
                                            <Button
                                                variant="secondary"
                                                className="w-32 text-sm"
                                            >
                                                View Details
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="text-error w-32 text-sm"
                                            >
                                                Revoke
                                            </Button>
                                        </>
                                    )}
                                    {request.status === "rejected" && (
                                        <>
                                            <Button
                                                variant="secondary"
                                                className="w-32 text-sm"
                                            >
                                                View Reason
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="w-32 text-sm"
                                            >
                                                Allow Resubmit
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
