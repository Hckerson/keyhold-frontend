import { formatCompactUsd } from "@/lib/utils";

export interface PayoutAmountProps {
    net: number;
    fee: number;
}

export function PayoutAmount({ net, fee }: PayoutAmountProps) {
    return (
        <span className="flex flex-col items-end leading-tight">
            <span className="text-text text-xs font-semibold tabular-nums">
                {formatCompactUsd(net)}
            </span>
            <span className="text-text-muted text-xs tabular-nums">
                −{formatCompactUsd(fee)}
            </span>
        </span>
    );
}

PayoutAmount.displayName = "PayoutAmount";
