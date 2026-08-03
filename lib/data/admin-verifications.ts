import { CheckCircle2, Clock3, XCircle, type LucideIcon } from "lucide-react";
import type { BadgeTone } from "@/components/features/shared/contact-row";

export type VerificationTier = "standard" | "premium" | "platinum";
export type VerificationStatus = "pending" | "approved" | "rejected";
export type VerificationFilterKey = "all" | VerificationStatus;
export type DocumentState = "verified" | "review" | "missing";
export type VerificationDecisionMode = "reject" | "info" | "revoke";
export type VerificationActionMode =
    | VerificationDecisionMode
    | "approve"
    | "resubmit";

export interface VerificationDocument {
    label: string;
    detail: string;
    state: DocumentState;
}

export interface VerificationRequest {
    id: string;
    name: string;
    email: string;
    phone: string;
    brokerage: string;
    region: string;
    currentTier: Exclude<VerificationTier, "platinum">;
    requestedTier: Exclude<VerificationTier, "standard">;
    status: VerificationStatus;
    submittedDate: string;
    waitingDays: number;
    closedVolume: number;
    closedDeals: number;
    tenureYears: number;
    documents: VerificationDocument[];
    note?: string;
    noteKind?: VerificationDecisionMode;
}

export interface VerificationAction {
    label: string;
    variant: "primary" | "secondary" | "ghost" | "outline-danger";
    mode: VerificationActionMode;
}

export interface VerificationDecision {
    mode: VerificationDecisionMode;
    id: string;
}

export const INITIAL_REQUESTS: VerificationRequest[] = [
    {
        id: "1",
        name: "Robert Chen",
        email: "robert@chenpartners.com",
        phone: "(310) 555-0119",
        brokerage: "Chen & Partners",
        region: "Beverly Hills, CA",
        currentTier: "premium",
        requestedTier: "platinum",
        status: "pending",
        submittedDate: "2024-07-13",
        waitingDays: 6,
        closedVolume: 184000000,
        closedDeals: 31,
        tenureYears: 12,
        documents: [
            {
                label: "Broker license",
                detail: "CA DRE 01998421 · expires 2026-04",
                state: "verified",
            },
            {
                label: "Errors & omissions cover",
                detail: "$2M aggregate · Lloyd's",
                state: "verified",
            },
            {
                label: "Closed volume statement",
                detail: "Trailing 24 months, brokerage-signed",
                state: "review",
            },
            {
                label: "Client references",
                detail: "3 of 3 returned",
                state: "verified",
            },
        ],
    },
    {
        id: "2",
        name: "Sophia Laurent",
        email: "sophia@laurentestates.com",
        phone: "(212) 555-0187",
        brokerage: "Laurent Estates",
        region: "Tribeca, NY",
        currentTier: "standard",
        requestedTier: "premium",
        status: "pending",
        submittedDate: "2024-07-12",
        waitingDays: 7,
        closedVolume: 62400000,
        closedDeals: 18,
        tenureYears: 6,
        documents: [
            {
                label: "Salesperson license",
                detail: "NY 10401355812 · expires 2025-11",
                state: "verified",
            },
            {
                label: "Errors & omissions cover",
                detail: "$1M aggregate · Hiscox",
                state: "verified",
            },
            {
                label: "Closed volume statement",
                detail: "Awaiting brokerage signature",
                state: "missing",
            },
        ],
    },
    {
        id: "3",
        name: "Andre Okafor",
        email: "andre@meridianluxe.com",
        phone: "(305) 555-0164",
        brokerage: "Meridian Luxe",
        region: "Coral Gables, FL",
        currentTier: "premium",
        requestedTier: "platinum",
        status: "pending",
        submittedDate: "2024-07-09",
        waitingDays: 10,
        closedVolume: 96700000,
        closedDeals: 22,
        tenureYears: 9,
        documents: [
            {
                label: "Broker license",
                detail: "FL BK3401882 · expires 2026-09",
                state: "verified",
            },
            {
                label: "Errors & omissions cover",
                detail: "Renewal pending, lapsed 2024-06",
                state: "review",
            },
            {
                label: "Closed volume statement",
                detail: "Trailing 24 months, brokerage-signed",
                state: "verified",
            },
            {
                label: "Client references",
                detail: "1 of 3 returned",
                state: "review",
            },
        ],
    },
    {
        id: "4",
        name: "Marcus Sterling",
        email: "marcus@sterlinggroup.com",
        phone: "(415) 555-0132",
        brokerage: "Sterling Group",
        region: "Pacific Heights, CA",
        currentTier: "standard",
        requestedTier: "premium",
        status: "approved",
        submittedDate: "2024-07-05",
        waitingDays: 0,
        closedVolume: 48900000,
        closedDeals: 15,
        tenureYears: 5,
        documents: [
            {
                label: "Salesperson license",
                detail: "CA DRE 02087741 · expires 2027-01",
                state: "verified",
            },
            {
                label: "Errors & omissions cover",
                detail: "$1M aggregate · Chubb",
                state: "verified",
            },
            {
                label: "Closed volume statement",
                detail: "Trailing 24 months, brokerage-signed",
                state: "verified",
            },
        ],
    },
    {
        id: "5",
        name: "Helena Voss",
        email: "helena@vosscollective.com",
        phone: "(206) 555-0143",
        brokerage: "Voss Collective",
        region: "Medina, WA",
        currentTier: "premium",
        requestedTier: "platinum",
        status: "approved",
        submittedDate: "2024-07-02",
        waitingDays: 0,
        closedVolume: 143500000,
        closedDeals: 26,
        tenureYears: 14,
        documents: [
            {
                label: "Broker license",
                detail: "WA 21014477 · expires 2026-03",
                state: "verified",
            },
            {
                label: "Errors & omissions cover",
                detail: "$3M aggregate · Lloyd's",
                state: "verified",
            },
            {
                label: "Closed volume statement",
                detail: "Trailing 24 months, brokerage-signed",
                state: "verified",
            },
            {
                label: "Client references",
                detail: "3 of 3 returned",
                state: "verified",
            },
        ],
    },
    {
        id: "6",
        name: "Jennifer Martinez",
        email: "jennifer@martinezrealty.com",
        phone: "(602) 555-0175",
        brokerage: "Martinez Realty",
        region: "Paradise Valley, AZ",
        currentTier: "premium",
        requestedTier: "platinum",
        status: "rejected",
        submittedDate: "2024-06-28",
        waitingDays: 0,
        closedVolume: 21300000,
        closedDeals: 7,
        tenureYears: 3,
        documents: [
            {
                label: "Broker license",
                detail: "AZ BR695114000 · expires 2025-08",
                state: "verified",
            },
            {
                label: "Errors & omissions cover",
                detail: "No policy on file",
                state: "missing",
            },
            {
                label: "Closed volume statement",
                detail: "Trailing 24 months, self-reported",
                state: "review",
            },
        ],
        note: "Closed volume falls short of the platinum floor and the E&O policy is not on file. Re-apply once both are resolved.",
        noteKind: "reject",
    },
];

export const tierMeta: Record<
    VerificationTier,
    { label: string; cls: string }
> = {
    standard: { label: "Standard", cls: "text-text-muted" },
    premium: { label: "Premium", cls: "text-info" },
    platinum: { label: "Platinum", cls: "text-highlight-dark" },
};

export const statusMeta: Record<
    VerificationStatus,
    { tone: BadgeTone; label: string }
> = {
    pending: { tone: "warning", label: "Pending" },
    approved: { tone: "success", label: "Approved" },
    rejected: { tone: "error", label: "Rejected" },
};

export const documentMeta: Record<
    DocumentState,
    { icon: LucideIcon; cls: string; label: string }
> = {
    verified: { icon: CheckCircle2, cls: "text-success", label: "Verified" },
    review: { icon: Clock3, cls: "text-warning", label: "In review" },
    missing: { icon: XCircle, cls: "text-error", label: "Missing" },
};

export const noteMeta: Record<
    VerificationDecisionMode,
    { title: string; variant: "warning" | "error" }
> = {
    reject: { title: "Rejection reason", variant: "error" },
    info: { title: "Documents requested", variant: "warning" },
    revoke: { title: "Tier revoked", variant: "warning" },
};

export const VERIFICATION_FILTERS: {
    id: VerificationFilterKey;
    label: string;
}[] = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
];

export const actionsByStatus: Record<VerificationStatus, VerificationAction[]> =
    {
        pending: [
            { label: "Approve tier", variant: "primary", mode: "approve" },
            { label: "Request documents", variant: "secondary", mode: "info" },
            { label: "Reject", variant: "outline-danger", mode: "reject" },
        ],
        approved: [
            { label: "Revoke tier", variant: "outline-danger", mode: "revoke" },
        ],
        rejected: [
            { label: "Allow resubmit", variant: "secondary", mode: "resubmit" },
        ],
    };

export const DECISION_COPY: Record<
    VerificationDecisionMode,
    { title: string; label: string; placeholder: string; submit: string }
> = {
    reject: {
        title: "Reject verification",
        label: "Reason for rejection",
        placeholder:
            "Explain which requirement the application fails. This reason is stored with the request and sent to the agent.",
        submit: "Reject request",
    },
    info: {
        title: "Request documents",
        label: "Documents required",
        placeholder:
            "List exactly which documents the agent must upload before this tier can be approved.",
        submit: "Send request",
    },
    revoke: {
        title: "Revoke tier",
        label: "Reason for revocation",
        placeholder:
            "Explain why the granted tier is being withdrawn. The agent returns to the pending queue.",
        submit: "Revoke tier",
    },
};

export const DECISION_RESULT: Record<
    VerificationDecisionMode,
    VerificationStatus
> = {
    reject: "rejected",
    info: "pending",
    revoke: "pending",
};
