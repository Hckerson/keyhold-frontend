import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export type ListingStatus = "active" | "under-offer" | "sold";

export interface ListingManageRowProps {
    address: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    status: ListingStatus;
    listDate: string;
    showings: number;
    offers: number;
    className?: string;
}

const statusTone = {
    active: "success",
    "under-offer": "warning",
    sold: "neutral",
} as const;

const statusLabel = {
    active: "Active",
    "under-offer": "Under Offer",
    sold: "Sold",
};

function daysOnMarket(listDate: string) {
    return Math.max(
        0,
        Math.floor((Date.now() - new Date(listDate).getTime()) / 86_400_000),
    );
}

function Field({
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
            <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                {label}
            </p>
            <p
                className={cn(
                    "mt-0.5 text-sm font-medium tabular-nums",
                    accent ? "text-accent" : "text-text",
                )}
            >
                {value}
            </p>
        </div>
    );
}

export function ListingManageRow({
    address,
    price,
    beds,
    baths,
    sqft,
    status,
    listDate,
    showings,
    offers,
    className,
}: ListingManageRowProps) {
    return (
        <article
            className={cn(
                "bg-background-muted border-border-light hover:border-border ease-smooth flex flex-col gap-4 rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-start sm:justify-between",
                className,
            )}
        >
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-text truncate text-sm font-medium">
                        {address}
                    </h3>
                    <StatusBadge tone={statusTone[status]} dot>
                        {statusLabel[status]}
                    </StatusBadge>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-h5 font-display text-accent font-light tabular-nums">
                        ${(price / 1_000_000).toFixed(2)}M
                    </span>
                    <span className="text-text-muted text-xs">
                        Listed {listDate}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                    <Field label="Beds / Baths" value={`${beds} / ${baths}`} />
                    <Field label="Sq Ft" value={sqft.toLocaleString()} />
                    <Field
                        label="Days on Market"
                        value={String(daysOnMarket(listDate))}
                    />
                </div>

                <div className="border-border-light mt-4 grid grid-cols-2 gap-4 border-t pt-4">
                    <Field label="Showings" value={String(showings)} />
                    <Field label="Offers" value={String(offers)} accent />
                </div>
            </div>

            <div className="flex shrink-0 gap-2 sm:flex-col">
                <Button
                    variant="secondary"
                    size="sm"
                    className="w-full sm:w-28"
                >
                    View Details
                </Button>
                <Button variant="ghost" size="sm" className="w-full sm:w-28">
                    Edit
                </Button>
                <Button variant="ghost" size="sm" className="w-full sm:w-28">
                    Analytics
                </Button>
            </div>
        </article>
    );
}

ListingManageRow.displayName = "ListingManageRow";
