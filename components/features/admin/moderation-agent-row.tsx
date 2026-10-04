import { Avatar } from "@/components/ui/avatar";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { initialsOf } from "@/lib/utils";
import type { ModerationAgentLoad } from "@/lib/types";

export interface ModerationAgentRowProps {
    load: ModerationAgentLoad;
}

export function ModerationAgentRow({ load }: ModerationAgentRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <span className="flex min-w-0 items-center gap-2.5">
                    <Avatar
                        size="sm"
                        elevated={false}
                        initials={initialsOf(load.name)}
                        alt={load.name}
                    />
                    <span className="min-w-0 truncate text-xs">
                        <span className="text-text font-medium">
                            {load.name}
                        </span>
                        <span className="text-text-muted">
                            {" · "}
                            {load.email}
                        </span>
                    </span>
                </span>
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {load.submissions}
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {load.open}
            </td>
            <td className="py-0 pl-3 text-right">
                <ReportCountMark reports={load.reports} />
            </td>
        </tr>
    );
}

ModerationAgentRow.displayName = "ModerationAgentRow";
