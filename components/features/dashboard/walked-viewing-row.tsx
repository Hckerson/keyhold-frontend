import { ViewingAgentMark } from "@/components/features/dashboard/viewing-agent-mark";
import { ViewingPropertyLink } from "@/components/features/dashboard/viewing-property-link";
import { ViewingRatingMeter } from "@/components/features/dashboard/viewing-rating-meter";
import { formatViewingDate } from "@/lib/data/viewings";
import type { Viewing } from "@/lib/types";

const NO_SURVEY = "No survey yet";

export interface WalkedViewingRowProps {
    viewing: Viewing;
}

export function WalkedViewingRow({ viewing }: WalkedViewingRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <ViewingPropertyLink viewing={viewing} />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {formatViewingDate(viewing.date)}
            </td>
            <td className="py-0 pl-3">
                <ViewingAgentMark agent={viewing.agent} />
            </td>
            <td className="py-0 pl-3">
                <ViewingRatingMeter rating={viewing.survey?.rating} />
            </td>
            <td className="py-0 pl-3">
                <span className="block truncate text-xs">
                    <span className="text-text-secondary">
                        {viewing.survey?.interest ?? NO_SURVEY}
                    </span>
                    {viewing.survey && (
                        <span className="text-text-muted">
                            {" · "}
                            {viewing.survey.notes}
                        </span>
                    )}
                </span>
            </td>
        </tr>
    );
}

WalkedViewingRow.displayName = "WalkedViewingRow";
