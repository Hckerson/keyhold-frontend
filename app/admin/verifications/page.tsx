import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import type { BadgeTone } from "@/components/dashboard/contact-row";
import { cn } from "@/lib/utils";

type Tier = "standard" | "premium" | "platinum";
type Status = "pending" | "approved" | "rejected";

interface VerificationRequest {
    id: string;
    name: string;
    email: string;
    requestedTier: Exclude<Tier, "standard">;
    currentTier: Exclude<Tier, "platinum">;
    status: Status;
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

const tierColor: Record<Tier, string> = {
    platinum: "text-highlight-dark",
    premium: "text-info",
    standard: "text-text-muted",
};

const statusMeta: Record<Status, { tone: BadgeTone; label: string }> = {
    pending: { tone: "warning", label: "Pending" },
    approved: { tone: "success", label: "Approved" },
    rejected: { tone: "error", label: "Rejected" },
};

type Action = {
    label: string;
    variant: "primary" | "secondary" | "ghost" | "outline-danger";
};

const actionsByStatus: Record<Status, Action[]> = {
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

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function initials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

const tierLabel =
    "text-text-muted font-mono text-caption tracking-wide uppercase";

export default function AdminVerificationsPage() {
    const pending = verifications.filter((v) => v.status === "pending").length;
    const approved = verifications.filter(
        (v) => v.status === "approved",
    ).length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Tier Verifications"
                description={`${pending} pending · ${approved} approved`}
                action={
                    <Button variant="secondary" size="sm">
                        Export Report
                    </Button>
                }
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {verifications.map((request) => {
                    const meta = statusMeta[request.status];
                    const kind =
                        request.requestedTier === "platinum"
                            ? "High-value buyer / agent"
                            : "Professional agent";
                    return (
                        <article
                            key={request.id}
                            className="bg-background-muted border-border-light hover:border-border ease-smooth flex flex-col rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <span className="bg-accent-light text-accent grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold">
                                        {initials(request.name)}
                                    </span>
                                    <div className="min-w-0">
                                        <h3 className="text-text truncate text-sm font-medium">
                                            {request.name}
                                        </h3>
                                        <p className="text-text-muted truncate text-xs">
                                            {request.email}
                                        </p>
                                    </div>
                                </div>
                                <StatusBadge tone={meta.tone}>
                                    {meta.label}
                                </StatusBadge>
                            </div>

                            <div className="bg-background-alt mt-3 flex items-center gap-3 rounded-lg px-3 py-2">
                                <div className="min-w-0">
                                    <p className={tierLabel}>Current</p>
                                    <p
                                        className={cn(
                                            "truncate text-sm font-medium",
                                            tierColor[request.currentTier],
                                        )}
                                    >
                                        {cap(request.currentTier)}
                                    </p>
                                </div>
                                <ArrowRight
                                    size={15}
                                    strokeWidth={1.5}
                                    className="text-text-muted shrink-0"
                                />
                                <div className="min-w-0">
                                    <p className={tierLabel}>Requested</p>
                                    <p
                                        className={cn(
                                            "font-display text-h6 truncate font-light",
                                            tierColor[request.requestedTier],
                                        )}
                                    >
                                        {cap(request.requestedTier)}
                                    </p>
                                </div>
                                <div className="ml-auto shrink-0 text-right">
                                    <p className={tierLabel}>Docs</p>
                                    <p className="text-text text-sm font-medium tabular-nums">
                                        {request.documents}
                                    </p>
                                </div>
                            </div>

                            <p className="text-text-muted mt-2 truncate text-xs">
                                {kind} · Submitted {request.submittedDate}
                            </p>

                            <div className="mt-4 flex gap-2">
                                {actionsByStatus[request.status].map(
                                    (action) => (
                                        <Button
                                            key={action.label}
                                            variant={action.variant}
                                            size="sm"
                                            className="flex-1"
                                        >
                                            {action.label}
                                        </Button>
                                    ),
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
