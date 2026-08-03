import { ArrowRight } from "lucide-react";
import {
    tierMeta,
    type VerificationTier,
} from "@/lib/data/admin-verifications";
import { cn } from "@/lib/utils";

export interface VerificationTierPathProps {
    from: VerificationTier;
    to: VerificationTier;
    className?: string;
}

export function VerificationTierPath({
    from,
    to,
    className,
}: VerificationTierPathProps) {
    return (
        <p
            className={cn(
                "flex items-center gap-1 font-mono text-[10px] tracking-wide uppercase",
                className,
            )}
        >
            <span className={tierMeta[from].cls}>{tierMeta[from].label}</span>
            <ArrowRight
                size={12}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-text-muted shrink-0"
            />
            <span className={cn("font-semibold", tierMeta[to].cls)}>
                {tierMeta[to].label}
            </span>
        </p>
    );
}

VerificationTierPath.displayName = "VerificationTierPath";
