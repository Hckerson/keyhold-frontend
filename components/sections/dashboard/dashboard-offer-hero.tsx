import { OverviewOfferList } from "@/components/features/dashboard/overview-offer-list";
import { PanelLink } from "@/components/features/shared/panel-link";
import { offerBook, offerPositions } from "@/lib/data/dashboard-overview";
import { formatCompactUsd } from "@/lib/utils";

const OFFERS_LINK_LABEL = "Open offers";

export function DashboardOfferHero() {
    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label">
                        {offerBook.label} · {offerBook.liveCount} live ·{" "}
                        {offerBook.awaitingCount} awaiting you
                    </p>
                    <p className="text-h4 font-display text-text mt-1 font-light tabular-nums">
                        {formatCompactUsd(offerBook.value)}
                    </p>
                </div>
                <PanelLink href={offerBook.href} label={OFFERS_LINK_LABEL} />
            </div>

            <div className="bg-background-muted border-border-light mt-3 rounded-md border px-3">
                <OverviewOfferList offers={offerPositions} />
            </div>
        </section>
    );
}

DashboardOfferHero.displayName = "DashboardOfferHero";
