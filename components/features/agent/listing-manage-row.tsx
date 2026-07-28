import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/forms/checkbox";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn, formatMillions } from "@/lib/utils";
import type { ManagedListing, ManagedListingStatus } from "@/lib/types";

export interface ListingManageRowProps {
    listing: ManagedListing;
    selected?: boolean;
    onSelectedChange?: (id: string, selected: boolean) => void;
    className?: string;
}

export const LISTING_STATUSES: Record<
    ManagedListingStatus,
    {
        tone: "success" | "warning" | "neutral" | "info" | "error";
        label: string;
    }
> = {
    active: { tone: "success", label: "Active" },
    "under-offer": { tone: "warning", label: "Under Offer" },
    sold: { tone: "neutral", label: "Sold" },
    draft: { tone: "info", label: "Draft" },
    expired: { tone: "error", label: "Expired" },
};

function daysOnMarket(listDate: string) {
    return Math.max(
        0,
        Math.floor((Date.now() - new Date(listDate).getTime()) / 86_400_000),
    );
}

function Metric({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="min-w-0">
            <p className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                {label}
            </p>
            <p
                className={cn(
                    "mt-0.5 text-xs font-medium tabular-nums",
                    accent ? "text-accent" : "text-text",
                )}
            >
                {value}
            </p>
        </div>
    );
}

export function ListingManageRow({
    listing,
    selected = false,
    onSelectedChange,
    className,
}: ListingManageRowProps) {
    const {
        id,
        address,
        price,
        beds,
        baths,
        sqft,
        status,
        listDate,
        views,
        saves,
        showings,
        offers,
    } = listing;
    const { tone, label } = LISTING_STATUSES[status];

    return (
        <article
            className={cn(
                "ease-smooth flex flex-col gap-3 rounded-xl border p-3 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-start sm:justify-between",
                selected
                    ? "border-accent bg-accent-light/40"
                    : "border-border-light bg-background-muted hover:border-border",
                className,
            )}
        >
            <div className="flex min-w-0 flex-1 gap-3">
                {onSelectedChange && (
                    <Checkbox
                        id={`listing-${id}`}
                        checked={selected}
                        aria-label={`Select ${address}`}
                        onChange={(event) =>
                            onSelectedChange(id, event.target.checked)
                        }
                        className="mt-0.5"
                    />
                )}

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-text truncate text-xs font-medium">
                            {address}
                        </h3>
                        <StatusBadge tone={tone}>{label}</StatusBadge>
                    </div>

                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-h6 font-display text-accent font-light tabular-nums">
                            {formatMillions(price, 2)}
                        </span>
                        <span className="text-text-muted text-xs tabular-nums">
                            Listed {listDate} · {daysOnMarket(listDate)} days on
                            market
                        </span>
                    </div>

                    <p className="text-text-secondary mt-1 text-xs tabular-nums">
                        {beds} beds · {baths} baths · {sqft.toLocaleString()} sq
                        ft
                    </p>

                    <div className="border-border mt-3 grid grid-cols-2 gap-3 border-t pt-3 sm:grid-cols-4">
                        <Metric label="Views" value={views.toLocaleString()} />
                        <Metric label="Saves" value={saves.toLocaleString()} />
                        <Metric label="Showings" value={String(showings)} />
                        <Metric
                            label="Offers"
                            value={String(offers)}
                            accent={offers > 0}
                        />
                    </div>
                </div>
            </div>

            <div className="flex shrink-0 gap-2 sm:flex-col">
                <Button
                    variant="secondary"
                    size="sm"
                    className="w-full sm:w-24"
                >
                    Details
                </Button>
                <Button variant="ghost" size="sm" className="w-full sm:w-24">
                    Edit
                </Button>
                <Button variant="ghost" size="sm" className="w-full sm:w-24">
                    Analytics
                </Button>
            </div>
        </article>
    );
}

ListingManageRow.displayName = "ListingManageRow";
