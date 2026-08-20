import { MetricCell } from "@/components/patterns/metric-cell";
import { RegionShareMeter } from "@/components/features/admin/region-share-meter";
import { formatCount, formatMillions } from "@/lib/utils";
import type { RegionPerformance } from "@/lib/types";

const TILE_EYEBROW = "Leading region";
const VOLUME_LABEL = "Transaction volume";

export interface RegionLeaderTileProps {
    region: RegionPerformance;
}

export function RegionLeaderTile({ region }: RegionLeaderTileProps) {
    return (
        <article className="border-highlight/25 bg-background rounded-lg border p-3 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label truncate">
                        {TILE_EYEBROW} · {VOLUME_LABEL}
                    </p>
                    <p className="text-text mt-0.5 truncate text-xs font-semibold">
                        {region.region}
                    </p>
                </div>
                <p className="text-h6 font-display text-highlight-dark shrink-0 font-light tabular-nums">
                    {formatMillions(region.volume, 0)}
                </p>
            </div>

            <div className="metric-strip bg-background-muted border-border-light mt-2.5 gap-3 rounded-md border p-3">
                <MetricCell label="Listings">
                    <span className="tabular-nums">
                        {formatCount(region.listings)}
                    </span>
                </MetricCell>
                <MetricCell label="Avg price">
                    <span className="tabular-nums">
                        {formatMillions(region.avgPrice, 1)}
                    </span>
                </MetricCell>
                <MetricCell label="Share of volume">
                    <RegionShareMeter
                        share={region.share}
                        rank={region.rank}
                        label={region.region}
                    />
                </MetricCell>
            </div>
        </article>
    );
}

RegionLeaderTile.displayName = "RegionLeaderTile";
