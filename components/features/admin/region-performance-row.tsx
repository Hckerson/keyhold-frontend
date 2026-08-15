import { RegionRankMark } from "@/components/features/admin/region-rank-mark";
import { RegionShareMeter } from "@/components/features/admin/region-share-meter";
import { formatCount, formatMillions } from "@/lib/utils";
import type { RegionPerformance } from "@/lib/types";

export interface RegionPerformanceRowProps {
    region: RegionPerformance;
}

export function RegionPerformanceRow({ region }: RegionPerformanceRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-9 transition-colors">
            <td className="py-0">
                <RegionRankMark rank={region.rank} />
            </td>
            <td className="text-text truncate py-0 pl-3 text-xs font-medium">
                {region.region}
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {formatCount(region.listings)}
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {formatMillions(region.avgPrice, 1)}
            </td>
            <td className="py-0 pl-3">
                <RegionShareMeter
                    share={region.share}
                    rank={region.rank}
                    label={region.region}
                    className="justify-end"
                />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(region.volume, 0)}
            </td>
        </tr>
    );
}

RegionPerformanceRow.displayName = "RegionPerformanceRow";
