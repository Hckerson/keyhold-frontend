import { RegionPerformanceRow } from "@/components/features/admin/region-performance-row";
import type { RegionPerformance } from "@/lib/types";

const TABLE_CAPTION =
    "Regions ranked by transaction volume, with listing count, average price and share of regional volume";

export interface RegionPerformanceTableProps {
    regions: RegionPerformance[];
}

export function RegionPerformanceTable({
    regions,
}: RegionPerformanceTableProps) {
    return (
        <table className="table-flush w-full min-w-2xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label w-6 text-left">
                        #
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Region
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Listings
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-24 pl-3 text-right"
                    >
                        Avg price
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-28 pl-3 text-right"
                    >
                        Share
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Volume
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {regions.map((region) => (
                    <RegionPerformanceRow key={region.region} region={region} />
                ))}
            </tbody>
        </table>
    );
}

RegionPerformanceTable.displayName = "RegionPerformanceTable";
