import { UserDealMark } from "@/components/features/admin/user-deal-mark";
import { UserVolumeMeter } from "@/components/features/admin/user-volume-meter";
import type { UserBreakdown } from "@/lib/types";

export interface UserBreakdownRowProps {
    breakdown: UserBreakdown;
    peak: number;
}

export function UserBreakdownRow({ breakdown, peak }: UserBreakdownRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="text-text min-w-0 truncate py-0 text-xs font-medium">
                {breakdown.label}
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {breakdown.accounts}
            </td>
            <td className="py-0 pl-3 text-right">
                <UserDealMark deals={breakdown.deals} />
            </td>
            <td className="py-0 pl-3 text-right">
                <UserVolumeMeter volume={breakdown.volume} peak={peak} />
            </td>
        </tr>
    );
}

UserBreakdownRow.displayName = "UserBreakdownRow";
