import { UserBreakdownRow } from "@/components/features/admin/user-breakdown-row";
import { peakBreakdownVolume } from "@/lib/data/admin-users";
import type { UserBreakdown } from "@/lib/types";

export interface UserBreakdownTableProps {
    groupLabel: string;
    breakdowns: UserBreakdown[];
    caption: string;
}

export function UserBreakdownTable({
    groupLabel,
    breakdowns,
    caption,
}: UserBreakdownTableProps) {
    const peak = peakBreakdownVolume(breakdowns);

    return (
        <table className="table-flush w-full table-fixed">
            <caption className="sr-only">{caption}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        {groupLabel}
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Accts
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Deals
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-28 pl-3 text-right"
                    >
                        Volume
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {breakdowns.map((breakdown) => (
                    <UserBreakdownRow
                        key={breakdown.id}
                        breakdown={breakdown}
                        peak={peak}
                    />
                ))}
            </tbody>
        </table>
    );
}

UserBreakdownTable.displayName = "UserBreakdownTable";
