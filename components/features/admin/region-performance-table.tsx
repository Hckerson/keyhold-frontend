import { ProgressBar } from "@/components/ui/progress-bar";
import { cn, formatCount, formatMillions } from "@/lib/utils";
import type { RegionPerformance } from "@/lib/data/admin-reports";

const ROW_GRID =
    "grid grid-cols-[1.25rem_minmax(0,1fr)_4.5rem] items-center gap-3 sm:grid-cols-[1.25rem_minmax(0,1fr)_3.25rem_4rem_4.5rem]";

export interface RegionPerformanceTableProps {
    regions: RegionPerformance[];
}

function RegionRow({ region }: { region: RegionPerformance }) {
    const leading = region.rank === 1;

    return (
        <li className={cn(ROW_GRID, "py-2")}>
            <span className="micro-label tabular-nums">{region.rank}</span>

            <div className="min-w-0">
                <p
                    className={cn(
                        "text-text truncate text-xs",
                        leading ? "font-semibold" : "font-medium",
                    )}
                >
                    {region.region}
                </p>
                <ProgressBar
                    value={region.intensity}
                    tone={leading ? "highlight" : "accent"}
                    className="mt-1.5"
                />
            </div>

            <span className="text-text-secondary hidden text-xs tabular-nums sm:block sm:text-right">
                {formatCount(region.listings)}
            </span>
            <span className="text-text-secondary hidden text-xs tabular-nums sm:block sm:text-right">
                {formatMillions(region.avgPrice, 1)}
            </span>
            <span
                className={cn(
                    "text-right text-xs font-semibold tabular-nums",
                    leading ? "text-highlight-dark" : "text-text",
                )}
            >
                {formatMillions(region.volume, 0)}
            </span>
        </li>
    );
}

export function RegionPerformanceTable({
    regions,
}: RegionPerformanceTableProps) {
    return (
        <div className="flex flex-col">
            <div
                className={cn(
                    ROW_GRID,
                    "border-border-dark border-b pt-1 pb-2",
                )}
            >
                <span className="micro-label">#</span>
                <span className="micro-label">Region</span>
                <span className="micro-label hidden sm:block sm:text-right">
                    Listings
                </span>
                <span className="micro-label hidden sm:block sm:text-right">
                    Avg price
                </span>
                <span className="micro-label text-right">Volume</span>
            </div>

            <ul className="divide-border divide-y">
                {regions.map((region) => (
                    <RegionRow key={region.region} region={region} />
                ))}
            </ul>
        </div>
    );
}

RegionPerformanceTable.displayName = "RegionPerformanceTable";
