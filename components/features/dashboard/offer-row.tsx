import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn, formatUsd } from "@/lib/utils";
import type { Offer, OfferStatus } from "@/lib/types";

export interface OfferRowProps {
    offer: Offer;
    onWithdraw?: (id: string) => void;
    className?: string;
}

const statusTone = {
    submitted: "warning",
    countered: "info",
    accepted: "success",
    rejected: "error",
    withdrawn: "neutral",
} as const;

export const OFFER_STATUS_LABEL: Record<OfferStatus, string> = {
    submitted: "Submitted",
    countered: "Countered",
    accepted: "Accepted",
    rejected: "Rejected",
    withdrawn: "Withdrawn",
};

function Metric({
    label,
    value,
    valueClassName,
}: {
    label: string;
    value: string;
    valueClassName?: string;
}) {
    return (
        <div className="min-w-0">
            <p className="micro-label">{label}</p>
            <p
                className={cn(
                    "mt-0.5 text-xs font-medium tabular-nums",
                    valueClassName,
                )}
            >
                {value}
            </p>
        </div>
    );
}

export function OfferRow({ offer, onWithdraw, className }: OfferRowProps) {
    const { id, address, offerPrice, listPrice, counterPrice, status } = offer;
    const below = offerPrice < listPrice;
    const difference = Math.abs(listPrice - offerPrice);
    const isOpen = status === "submitted" || status === "countered";

    return (
        <article
            className={cn(
                "group bg-background-muted border-border-light hover:border-border ease-smooth flex flex-col gap-3 rounded-xl border p-3 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-start sm:justify-between",
                className,
            )}
        >
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        href={`/dashboard/offers/${id}`}
                        className="text-text hover:text-accent ease-smooth min-w-0 truncate text-xs font-medium transition-colors"
                    >
                        {address}
                    </Link>
                    <StatusBadge tone={statusTone[status]}>
                        {status === "countered" && counterPrice !== undefined
                            ? `Countered at ${formatUsd(counterPrice)}`
                            : OFFER_STATUS_LABEL[status]}
                    </StatusBadge>
                </div>

                <div className="mt-3">
                    <p className="micro-label">Your Offer</p>
                    <p className="font-display text-accent mt-0.5 text-lg font-light tabular-nums">
                        {formatUsd(offerPrice)}
                    </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <Metric
                        label="List Price"
                        value={formatUsd(listPrice)}
                        valueClassName="text-text"
                    />
                    <Metric
                        label="Difference"
                        value={`${below ? "-" : "+"}${formatUsd(difference)}`}
                        valueClassName={below ? "text-warning" : "text-success"}
                    />
                    <Metric
                        label="Counter"
                        value={
                            counterPrice === undefined
                                ? "—"
                                : formatUsd(counterPrice)
                        }
                        valueClassName="text-text"
                    />
                </div>

                <p className="text-text-muted mt-3 text-xs">
                    Last activity {offer.lastActivity}
                </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col">
                <Link href={`/dashboard/offers/${id}`} className="block">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-full sm:w-32"
                    >
                        View Details
                    </Button>
                </Link>
                {status === "countered" && (
                    <Link href={`/dashboard/offers/${id}`} className="block">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="w-full sm:w-32"
                        >
                            Counter
                        </Button>
                    </Link>
                )}
                {isOpen && onWithdraw && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-error hover:text-error w-full sm:w-32"
                        onClick={() => onWithdraw(id)}
                    >
                        Withdraw
                    </Button>
                )}
            </div>
        </article>
    );
}

OfferRow.displayName = "OfferRow";
