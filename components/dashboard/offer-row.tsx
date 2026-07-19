import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export type OfferStatus = "pending" | "accepted" | "rejected" | "countered";

export interface Offer {
    id: string;
    address: string;
    offerPrice: number;
    listPrice: number;
    status: OfferStatus;
    daysOld: number;
}

export interface OfferRowProps {
    offer: Offer;
    className?: string;
}

const statusTone = {
    pending: "warning",
    accepted: "success",
    rejected: "error",
    countered: "info",
} as const;

const toMillions = (value: number) => `$${(value / 1_000_000).toFixed(2)}M`;

function Metric({
    label,
    value,
    className,
}: {
    label: string;
    value: string;
    className?: string;
}) {
    return (
        <div className="min-w-0">
            <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                {label}
            </p>
            <p
                className={cn(
                    "font-display mt-0.5 text-lg font-light tabular-nums",
                    className,
                )}
            >
                {value}
            </p>
        </div>
    );
}

export function OfferRow({ offer, className }: OfferRowProps) {
    const { id, address, offerPrice, listPrice, status, daysOld } = offer;
    const below = offerPrice < listPrice;
    const difference = Math.abs(listPrice - offerPrice);
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <article
            className={cn(
                "group bg-background-muted border-border-light hover:border-border ease-smooth flex flex-col gap-4 rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-start sm:justify-between",
                className,
            )}
        >
            <div className="min-w-0 flex-1">
                <h3 className="text-text truncate text-sm font-medium">
                    {address}
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <Metric
                        label="Your Offer"
                        value={toMillions(offerPrice)}
                        className="text-accent"
                    />
                    <Metric
                        label="List Price"
                        value={toMillions(listPrice)}
                        className="text-text"
                    />
                    <Metric
                        label="Difference"
                        value={`${below ? "-" : "+"}${toMillions(difference)}`}
                        className={below ? "text-warning" : "text-success"}
                    />
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <span className="text-text-muted text-xs">
                        Submitted {daysOld} days ago
                    </span>
                    <StatusBadge tone={statusTone[status]}>
                        {statusLabel}
                    </StatusBadge>
                </div>
            </div>

            <div className="flex shrink-0 gap-2 sm:flex-col">
                <Link href={`/listing/${id}`} className="block">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-full sm:w-32"
                    >
                        View Property
                    </Button>
                </Link>
                {status === "pending" && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full sm:w-32"
                    >
                        Withdraw
                    </Button>
                )}
            </div>
        </article>
    );
}

OfferRow.displayName = "OfferRow";
