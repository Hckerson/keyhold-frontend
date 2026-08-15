import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import type { ModerationAgentLoad } from "@/lib/types";

export interface ModerationAgentRowProps {
    load: ModerationAgentLoad;
}

export function ModerationAgentRow({ load }: ModerationAgentRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="min-w-0 py-0">
                <span className="text-text block truncate text-xs font-medium">
                    {load.name}
                </span>
                <span className="text-text-muted block truncate text-[10px]">
                    {load.firm}
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
