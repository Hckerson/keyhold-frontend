import { PAYOUT_METHODS } from "@/lib/config/admin-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { PayoutMethod } from "@/lib/types";

export interface PayoutMethodMarkProps {
    method: PayoutMethod;
    className?: string;
}

export function PayoutMethodMark({ method, className }: PayoutMethodMarkProps) {
    const { icon: Icon, label, tone } = PAYOUT_METHODS[method];

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

PayoutMethodMark.displayName = "PayoutMethodMark";
