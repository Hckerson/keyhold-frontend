import { OverviewOfferList } from "@/components/features/dashboard/overview-offer-list";
import { PanelLink } from "@/components/features/shared/panel-link";
import { formatCompactUsd } from "@/lib/utils";
import type { OfferBook, OfferPosition } from "@/lib/types";

const OFFERS_LINK_LABEL = "Open offers";
const LIVE_SUFFIX = "live";
const AWAITING_SUFFIX = "awaiting you";

export interface DashboardOfferHeroProps {
    book: OfferBook;
    positions: OfferPosition[];
}

export function DashboardOfferHero({
    book,
    positions,
}: DashboardOfferHeroProps) {
    return (
        <section className="border-accent/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label">
                        {book.label} · {book.liveCount} {LIVE_SUFFIX} ·{" "}
                        {book.awaitingCount} {AWAITING_SUFFIX}
                    </p>
                    <p className="text-h4 font-display text-text mt-1 font-light tabular-nums">
                        {formatCompactUsd(book.value)}
                    </p>
                </div>
                <PanelLink href={book.href} label={OFFERS_LINK_LABEL} />
            </div>

            <div className="bg-background-muted border-border-light mt-3 rounded-md border px-3">
                <OverviewOfferList offers={positions} />
            </div>
        </section>
    );
}

DashboardOfferHero.displayName = "DashboardOfferHero";
