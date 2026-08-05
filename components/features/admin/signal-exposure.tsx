import { formatCompactUsd } from "@/lib/utils";

const NO_EXPOSURE = "—";

export interface SignalExposureProps {
    amount?: number;
}

export function SignalExposure({ amount }: SignalExposureProps) {
    if (amount === undefined) {
        return <span className="text-text-muted text-xs">{NO_EXPOSURE}</span>;
    }

    return (
        <span className="text-text text-xs font-semibold tabular-nums">
            {formatCompactUsd(amount)}
        </span>
    );
}

SignalExposure.displayName = "SignalExposure";
