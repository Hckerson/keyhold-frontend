import { SIGNAL_DOMAINS } from "@/lib/config/admin-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { SignalDomain } from "@/lib/types";

export interface SignalDomainMarkProps {
    domain: SignalDomain;
    className?: string;
}

export function SignalDomainMark({ domain, className }: SignalDomainMarkProps) {
    const { icon: Icon, label, tone } = SIGNAL_DOMAINS[domain];

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

SignalDomainMark.displayName = "SignalDomainMark";
