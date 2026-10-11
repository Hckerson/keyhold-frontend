import { formatCompactUsd } from "@/lib/utils";
import type { LeaderConcentration } from "@/lib/types";

const TOP_PREFIX = "Together these";
const HOLD = "hold";
const OF = "of";
const SUFFIX = "in lifetime volume.";

export interface UserConcentrationStatementProps {
    concentration: LeaderConcentration;
}

export function UserConcentrationStatement({
    concentration,
}: UserConcentrationStatementProps) {
    const { share, total, leaders } = concentration;

    return (
        <p className="text-text-secondary pt-2 text-xs tabular-nums">
            {TOP_PREFIX} {leaders} {HOLD}{" "}
            <span className="text-text font-semibold">{share}%</span> {OF}{" "}
            {formatCompactUsd(total)} {SUFFIX}
        </p>
    );
}

UserConcentrationStatement.displayName = "UserConcentrationStatement";
