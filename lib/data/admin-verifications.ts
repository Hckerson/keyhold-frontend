import type { BadgeTone } from "@/components/features/shared/contact-row";

export type VerificationTier = "standard" | "premium" | "platinum";
export type VerificationStatus = "pending" | "approved" | "rejected";

export interface VerificationRequest {
    id: string;
    name: string;
    email: string;
    requestedTier: Exclude<VerificationTier, "standard">;
    currentTier: Exclude<VerificationTier, "platinum">;
    status: VerificationStatus;
    submittedDate: string;
    documents: number;
}

export interface VerificationAction {
    label: string;
    variant: "primary" | "secondary" | "ghost" | "outline-danger";
}

export const verifications: VerificationRequest[] = [
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

export const tierColor: Record<VerificationTier, string> = {
    platinum: "text-highlight-dark",
    premium: "text-info",
    standard: "text-text-muted",
};

export const statusMeta: Record<
    VerificationStatus,
    { tone: BadgeTone; label: string }
> = {
    pending: { tone: "warning", label: "Pending" },
    approved: { tone: "success", label: "Approved" },
    rejected: { tone: "error", label: "Rejected" },
};

export const actionsByStatus: Record<VerificationStatus, VerificationAction[]> =
    {
        pending: [
            { label: "Approve", variant: "primary" },
            { label: "Review Docs", variant: "secondary" },
            { label: "Reject", variant: "outline-danger" },
        ],
        approved: [
            { label: "View Details", variant: "secondary" },
            { label: "Revoke", variant: "outline-danger" },
        ],
        rejected: [
            { label: "View Reason", variant: "secondary" },
            { label: "Allow Resubmit", variant: "ghost" },
        ],
    };
