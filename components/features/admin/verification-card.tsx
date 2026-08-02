import { ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
    actionsByStatus,
    statusMeta,
    tierColor,
    type VerificationRequest,
} from "@/lib/data/admin-verifications";
import { cn, initialsOf } from "@/lib/utils";

const tierLabel =
    "text-text-muted font-mono text-caption tracking-wide uppercase";

const cap = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export interface VerificationCardProps {
    request: VerificationRequest;
}

export function VerificationCard({ request }: VerificationCardProps) {
    const meta = statusMeta[request.status];
    const kind =
        request.requestedTier === "platinum"
            ? "High-value buyer / agent"
            : "Professional agent";

    return (
        <article className="bg-background-muted border-border-light hover:border-border ease-smooth flex flex-col rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                    <Avatar
                        tone="accent"
                        elevated={false}
                        size="sm"
                        className="size-9"
                        initials={initialsOf(request.name)}
                    />
                    <div className="min-w-0">
                        <h3 className="text-text truncate text-sm font-medium">
                            {request.name}
                        </h3>
                        <p className="text-text-muted truncate text-xs">
                            {request.email}
                        </p>
                    </div>
                </div>
                <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
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
                {actionsByStatus[request.status].map((action) => (
                    <Button
                        key={action.label}
                        variant={action.variant}
                        size="sm"
                        className="flex-1"
                    >
                        {action.label}
                    </Button>
                ))}
            </div>
        </article>
    );
}

VerificationCard.displayName = "VerificationCard";
