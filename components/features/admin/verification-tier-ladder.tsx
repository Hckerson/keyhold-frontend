import {
    tierMeta,
    type VerificationRequest,
} from "@/lib/data/admin-verifications";
import { cn } from "@/lib/utils";

export interface VerificationTierLadderProps {
    request: VerificationRequest;
}

export function VerificationTierLadder({
    request,
}: VerificationTierLadderProps) {
    const current = tierMeta[request.currentTier];
    const requested = tierMeta[request.requestedTier];

    return (
        <div className="bg-background-alt flex items-end justify-between gap-3 rounded-lg px-3 py-2.5">
            <div className="min-w-0">
                <p className="micro-label">Requested tier</p>
                <p
                    className={cn(
                        "font-display text-h4 mt-0.5 truncate font-light",
                        requested.cls,
                    )}
                >
                    {requested.label}
                </p>
                <p className="text-text-muted mt-1 text-xs">
                    Upgrading from{" "}
                    <span className={cn("font-medium", current.cls)}>
                        {current.label}
                    </span>{" "}
                    · submitted {request.submittedDate}
                </p>
            </div>
            <div className="shrink-0 text-right">
                <p className="micro-label">Waiting</p>
                <p className="text-text mt-0.5 text-xs font-semibold tabular-nums">
                    {request.waitingDays}d
                </p>
            </div>
        </div>
    );
}

VerificationTierLadder.displayName = "VerificationTierLadder";
