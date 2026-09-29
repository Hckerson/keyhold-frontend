import { IconChip } from "@/components/ui/icon-chip";
import { chartToneText } from "@/lib/config/chart-tones";
import { USER_ROLES } from "@/lib/config/user-tones";
import { ACCOUNT_COLUMNS } from "@/lib/data/admin-overview-people";
import { cn, formatCount } from "@/lib/utils";
import type { AccountMatrixRow as AccountMatrixRowData } from "@/lib/types";

const ALL_LABEL = "All accounts";

export interface AccountMatrixRowProps {
    row: AccountMatrixRowData;
}

export function AccountMatrixRow({ row }: AccountMatrixRowProps) {
    const all = row.id === "all";
    const role = row.id === "all" ? null : USER_ROLES[row.id];

    return (
        <tr
            className={cn(
                "h-9",
                all && "border-border-light bg-background-muted border-t",
            )}
        >
            <th scope="row" className="py-0 text-left font-normal">
                <span className="flex min-w-0 items-center gap-2">
                    {role && <IconChip icon={role.icon} tone={role.tone} />}
                    <span
                        className={cn(
                            "text-text truncate text-xs",
                            all ? "font-semibold" : "font-medium",
                        )}
                    >
                        {role ? role.plural : ALL_LABEL}
                    </span>
                </span>
            </th>
            {ACCOUNT_COLUMNS.map((column) => {
                const count = row.counts[column.id];
                return (
                    <td
                        key={column.id}
                        className={cn(
                            "py-0 pl-3 text-right text-xs tabular-nums",
                            count === 0
                                ? "text-text-muted"
                                : column.tone
                                  ? cn(
                                        chartToneText[column.tone],
                                        "font-semibold",
                                    )
                                  : "text-text",
                        )}
                    >
                        {formatCount(count)}
                    </td>
                );
            })}
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatCount(row.total)}
            </td>
        </tr>
    );
}

AccountMatrixRow.displayName = "AccountMatrixRow";
