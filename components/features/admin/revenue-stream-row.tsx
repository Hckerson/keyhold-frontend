import { RevenueStreamMark } from "@/components/features/admin/revenue-stream-mark";
import { ShareMeter } from "@/components/patterns/share-meter";
import { DeltaChip } from "@/components/ui/delta-chip";
import { REVENUE_STREAMS } from "@/lib/config/admin-tones";
import { streamShare } from "@/lib/data/admin-payments";
import { formatCompactUsd } from "@/lib/utils";
import type { RevenueStream } from "@/lib/types";

export interface RevenueStreamRowProps {
    stream: RevenueStream;
}

export function RevenueStreamRow({ stream }: RevenueStreamRowProps) {
    const meta = REVENUE_STREAMS[stream.id];
    const share = streamShare(stream);
    const rising = stream.momChange >= 0;

    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <RevenueStreamMark id={stream.id} />
            </td>
            <td className="py-0 pl-3">
                <ShareMeter
                    percent={share}
                    tone={meta.tone}
                    label={`${meta.label} is ${share}% of revenue year to date`}
                />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatCompactUsd(stream.ytd)}
            </td>
            <td className="py-0 pl-3 text-right">
                <DeltaChip
                    size="sm"
                    direction={rising ? "up" : "down"}
                    value={`${Math.abs(stream.momChange)}%`}
                />
            </td>
        </tr>
    );
}

RevenueStreamRow.displayName = "RevenueStreamRow";
