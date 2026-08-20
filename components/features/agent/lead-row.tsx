import { Check, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/patterns/status-dot";
import { LEAD_STAGES } from "@/lib/config/lead-tones";
import type { Lead } from "@/lib/types/lead";
import { formatCompactUsd, initialsOf } from "@/lib/utils";

const ACCEPT_LABEL = "Accept enquiry from";
const DECLINE_LABEL = "Decline enquiry from";
const UNREAD_SUFFIX = "unread";
const ACTION_CLASS =
    "ease-smooth focus-visible:ring-accent grid size-6 place-items-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none";

export interface LeadRowProps {
    lead: Lead;
    onRespond: (id: string, accept: boolean) => void;
}

export function LeadRow({ lead, onRespond }: LeadRowProps) {
    const stage = LEAD_STAGES[lead.stage];

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
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {lead.interests[0]}
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatCompactUsd(lead.budget)}
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {lead.unread > 0 ? `${lead.unread} ${UNREAD_SUFFIX}` : "—"}
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs tabular-nums">
                {lead.lastContact}
            </td>
            <td className="py-0 pl-3">
                {lead.stage === "pending" && (
                    <span className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => onRespond(lead.id, true)}
                            aria-label={`${ACCEPT_LABEL} ${lead.name}`}
                            className={`${ACTION_CLASS} text-success hover:bg-success-light`}
                        >
                            <Check className="size-3" strokeWidth={1.5} />
                        </button>
                        <button
                            type="button"
                            onClick={() => onRespond(lead.id, false)}
                            aria-label={`${DECLINE_LABEL} ${lead.name}`}
                            className={`${ACTION_CLASS} text-text-muted hover:bg-background-muted hover:text-error`}
                        >
                            <X className="size-3" strokeWidth={1.5} />
                        </button>
                    </span>
                )}
            </td>
        </tr>
    );
}

LeadRow.displayName = "LeadRow";
