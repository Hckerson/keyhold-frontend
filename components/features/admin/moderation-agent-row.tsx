import { Avatar } from "@/components/ui/avatar";
import { MetricCell } from "@/components/patterns/metric-cell";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { initialsOf } from "@/lib/utils";
import type { ModerationAgentLoad } from "@/lib/types";

const SENT_LABEL = "Sent";
const OPEN_LABEL = "Open";
const REPORTS_LABEL = "Reports";

export interface ModerationAgentRowProps {
    load: ModerationAgentLoad;
}

export function ModerationAgentRow({ load }: ModerationAgentRowProps) {
    return (
        <li
            title={load.email}
            className="bg-background-muted flex h-14 items-center gap-3 rounded-lg px-3"
        >
            <Avatar
                size="sm"
                elevated={false}
                initials={initialsOf(load.name)}
                alt={load.name}
            />
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {load.name}
            </span>
            <div className="flex shrink-0 gap-4 text-right">
                <MetricCell
                    label={SENT_LABEL}
                    className="flex flex-col items-end"
                >
                    <span className="text-text-secondary tabular-nums">
                        {load.submissions}
                    </span>
                </MetricCell>
                <MetricCell
                    label={OPEN_LABEL}
                    className="flex flex-col items-end"
                >
                    <span className="tabular-nums">{load.open}</span>
                </MetricCell>
                <MetricCell
                    label={REPORTS_LABEL}
                    className="flex flex-col items-end"
                >
                    <ReportCountMark reports={load.reports} />
                </MetricCell>
            </div>
        </li>
    );
}

ModerationAgentRow.displayName = "ModerationAgentRow";
