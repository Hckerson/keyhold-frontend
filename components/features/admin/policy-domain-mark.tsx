import { POLICY_DOMAINS } from "@/lib/config/settings-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { PolicyDomain } from "@/lib/types";

export interface PolicyDomainMarkProps {
    domain: PolicyDomain;
    className?: string;
}

export function PolicyDomainMark({ domain, className }: PolicyDomainMarkProps) {
    const { icon: Icon, label, tone } = POLICY_DOMAINS[domain];

    return (
        <span className={cn("flex min-w-0 items-center gap-2", className)}>
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[tone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {label}
            </span>
        </span>
    );
}

PolicyDomainMark.displayName = "PolicyDomainMark";
