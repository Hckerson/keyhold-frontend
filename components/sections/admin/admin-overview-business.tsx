import { BarChart3 } from "lucide-react";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { DeltaChip } from "@/components/ui/delta-chip";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { DeckFigure } from "@/components/patterns/deck-figure";
import { DeckPanel } from "@/components/patterns/deck-panel";
import { PanelLink } from "@/components/features/shared/panel-link";
import { FigureCell } from "@/components/features/admin/figure-cell";
import { ADMIN_ROUTES } from "@/lib/constants";
import { GMV_SERIES, type GmvReading } from "@/lib/data/admin-overview";
import { formatMillions } from "@/lib/utils";
import type { BusinessFigure, LifetimeVolume } from "@/lib/types";

const TITLE = "Volume";
const ACTION = "Payments";
const EMPTY_TITLE = "No settled volume yet";
const EMPTY_LEDE = "Monthly GMV charts once the first deal settles.";
const ERROR_TITLE = "Monthly volume unavailable";
const ERROR_LEDE = "The trend service did not answer this time.";
const NO_VOLUME = "$0";
const LOADING_READING = "Reading monthly volume";
const NO_MONTH = "No month has settled yet";
const CHART_HEIGHT = 160;
const MILLIONS = 1_000_000;

const volumeLine = (lifetime: LifetimeVolume) =>
    lifetime.averageDeal
        ? `${lifetime.settled} settled to date, ${lifetime.averageDeal} per deal`
        : `${lifetime.settled} settled to date`;

export interface AdminOverviewBusinessProps {
    reading: GmvReading | null;
    months: Record<string, string | number>[];
    figures: BusinessFigure[];
    lifetime: LifetimeVolume;
    pending?: boolean;
    failed?: boolean;
}

export function AdminOverviewBusiness({
    reading,
    months,
    figures,
    lifetime,
    pending,
    failed,
}: AdminOverviewBusinessProps) {
    return (
        <DeckPanel
            title={TITLE}
            summary={volumeLine(lifetime)}
            action={<PanelLink href={ADMIN_ROUTES.payments} label={ACTION} />}
            pending={pending}
        >
            <DeckFigure
                value={reading ? formatMillions(reading.value, 1) : NO_VOLUME}
                caption={
                    reading
                        ? `${reading.month} GMV · est. commissions ${reading.commissionEstimate} at ${reading.commissionRate}`
                        : failed
                          ? ERROR_TITLE
                          : pending
                            ? LOADING_READING
                            : NO_MONTH
                }
                aside={
                    reading?.delta && (
                        <DeltaChip
                            value={reading.delta.label}
                            direction={reading.delta.direction}
                        />
                    )
                }
                pending={pending}
            />

            {months.length > 0 ? (
                <ColumnChart
                    data={months}
                    xKey="month"
                    series={GMV_SERIES}
                    divideBy={MILLIONS}
                    fractionDigits={1}
                    valuePrefix="$"
                    valueSuffix="M"
                    height={CHART_HEIGHT}
                />
            ) : pending ? (
                <Skeleton className="w-full" style={{ height: CHART_HEIGHT }} />
            ) : (
                <EmptyState
                    icon={BarChart3}
                    title={failed ? ERROR_TITLE : EMPTY_TITLE}
                    description={failed ? ERROR_LEDE : EMPTY_LEDE}
                />
            )}

            <div className="bg-background-muted divide-border-light grid auto-cols-fr grid-flow-col divide-x overflow-hidden rounded-lg">
                {figures.map((figure) => (
                    <FigureCell key={figure.id} figure={figure} />
                ))}
            </div>
        </DeckPanel>
    );
}

AdminOverviewBusiness.displayName = "AdminOverviewBusiness";
