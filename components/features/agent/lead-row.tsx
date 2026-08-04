import { ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/patterns/status-dot";
import { LeadFitMeter } from "@/components/features/agent/lead-fit-meter";
import { chartToneText } from "@/lib/config/chart-tones";
import { LEAD_SCORES, LEAD_STAGES } from "@/lib/config/lead-tones";
import type { Lead } from "@/lib/data/agent-leads";
import { cn, formatCompactUsd, initialsOf } from "@/lib/utils";

export interface LeadRowProps {
    lead: Lead;
    onAdvance: (id: string) => void;
}

export function LeadRow({ lead, onAdvance }: LeadRowProps) {
    const stage = LEAD_STAGES[lead.stage];
    const score = LEAD_SCORES[lead.score];

    return (
        <tr className="hover:bg-background-muted ease-smooth h-11 transition-colors">
            <td className="py-0">
                <div className="flex min-w-0 items-center gap-2">
                    <Avatar
                        size="xs"
                        elevated={false}
                        src={lead.portrait}
                        alt={lead.name}
                        initials={initialsOf(lead.name)}
                        className="text-[10px]"
                    />
                    <span className="text-text min-w-0 truncate text-xs font-medium">
                        {lead.name}
                    </span>
                </div>
            </td>
            <td className="py-0 pl-3">
                <span className="flex min-w-0 items-center gap-1.5">
                    <StatusDot tone={stage.tone} />
                    <span className="text-text-secondary min-w-0 truncate text-xs">
                        {stage.label}
                    </span>
                </span>
            </td>
            <td
                className={cn(
                    "truncate py-0 pl-3 text-xs font-medium",
                    chartToneText[score.tone],
                )}
            >
                {score.label}
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatCompactUsd(lead.budget)}
            </td>
            <td className="py-0 pl-3">
                <LeadFitMeter percent={lead.fit} />
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {lead.lastContact}
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {lead.nextAction}
            </td>
            <td className="py-0 pl-3">
                <button
                    type="button"
                    onClick={() => onAdvance(lead.id)}
                    aria-label={`${stage.next.label} for ${lead.name}`}
                    className="text-text-muted hover:bg-background-muted hover:text-text ease-smooth focus-visible:ring-accent grid size-6 place-items-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                    <ChevronRight className="size-3" strokeWidth={1.5} />
                </button>
            </td>
        </tr>
    );
}

LeadRow.displayName = "LeadRow";
