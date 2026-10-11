import { StatusBadge } from "@/components/ui/status-badge";
import { PAYOUT_PHASES } from "@/lib/config/payout-tones";
import type { PayoutPhase } from "@/lib/types";

export interface PayoutPhaseBadgeProps {
    phase: PayoutPhase;
}

export function PayoutPhaseBadge({ phase }: PayoutPhaseBadgeProps) {
    const { label, icon, tone } = PAYOUT_PHASES[phase];

    return (
        <StatusBadge tone={tone} icon={icon} size="md">
            {label}
        </StatusBadge>
    );
}

PayoutPhaseBadge.displayName = "PayoutPhaseBadge";
