import { formatCompactUsd, formatCount } from "@/lib/utils";
import type { LeaderConcentration } from "@/lib/types";

const SHARE_NOUN = "of lifetime volume sits with";
const ACCOUNTS_NOUN = "accounts";

export interface UserConcentrationStatementProps {
    concentration: LeaderConcentration;
}

export function UserConcentrationStatement({
    concentration,
}: UserConcentrationStatementProps) {
    const { share, volume, total, leaders, accounts } = concentration;

    return (
        <div className="bg-background-muted flex flex-col gap-1 rounded-md p-3">
            <p className="flex items-baseline gap-2">
                <span className="font-display text-h4 text-text leading-none font-light tabular-nums">
                    {share}%
                </span>
                <span className="text-text-secondary text-xs">
                    {SHARE_NOUN} {leaders} {ACCOUNTS_NOUN}
                </span>
            </p>
            <p className="text-text-muted text-xs tabular-nums">
                {formatCompactUsd(volume)} of {formatCompactUsd(total)} across{" "}
                {formatCount(accounts)} {ACCOUNTS_NOUN}
            </p>
        </div>
    );
}

UserConcentrationStatement.displayName = "UserConcentrationStatement";
