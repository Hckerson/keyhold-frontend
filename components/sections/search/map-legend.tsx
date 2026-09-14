import { chartToneFill } from "@/lib/config/chart-tones";
import { LISTING_STATUSES } from "@/lib/config/listing-tones";
import { MAP_STATUS_TONE } from "@/lib/data/listing-map";
import { MANAGED_STATUS_BY_PROPERTY } from "@/lib/utils/to-managed-listing";
import { cn } from "@/lib/utils";
import type { ListingStatus } from "@/lib/types";

const LEGEND_LABEL = "Pin colour key";

const LEGEND_STATUSES: ListingStatus[] = ["AVAILABLE", "PENDING", "SOLD"];

export function MapLegend() {
    return (
        <ul
            aria-label={LEGEND_LABEL}
            className="bg-background-muted border-border-light flex h-9 items-center gap-3 rounded-md border px-3"
        >
            {LEGEND_STATUSES.map((status) => (
                <li key={status} className="flex items-center gap-1.5">
                    <span
                        aria-hidden="true"
                        className={cn(
                            "size-2 shrink-0 rounded-full",
                            chartToneFill[MAP_STATUS_TONE[status]],
                        )}
                    />
                    <span className="text-text-secondary text-xs">
                        {
                            LISTING_STATUSES[MANAGED_STATUS_BY_PROPERTY[status]]
                                .label
                        }
                    </span>
                </li>
            ))}
        </ul>
    );
}

MapLegend.displayName = "MapLegend";
