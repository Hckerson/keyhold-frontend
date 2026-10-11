"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { ChartBlock } from "@/components/patterns/chart-block";
import { DeckPanel } from "@/components/patterns/deck-panel";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ANALYTICS_SERIES } from "@/lib/config/admin-analytics";
import { measureAxis } from "@/lib/config/report-measures";
import { ADMIN_ROUTES } from "@/lib/constants";
import { volumeReading, windowTotal } from "@/lib/data/admin-analytics";
import { measureSeries } from "@/lib/data/admin-reports-measures";
import type { ReportMonth } from "@/lib/types";

const TITLE = "Volume";
const ACTION = "Statement";
const GMV_LABEL = "Settled GMV by month";
const DEALS_LABEL = "Closed deals by month";
const PRIMARY_HEIGHT = 168;
const SECONDARY_HEIGHT = 104;

export interface AdminAnalyticsVolumeProps {
    months: ReportMonth[];
    pending?: boolean;
}

export function AdminAnalyticsVolume({
    months,
    pending,
}: AdminAnalyticsVolumeProps) {
    const faded = (index: number) => months[index]?.partial ?? false;

    return (
        <DeckPanel
            title={TITLE}
            summary={pending ? undefined : volumeReading(months)}
            action={<PanelLink href={ADMIN_ROUTES.reports} label={ACTION} />}
            pending={pending}
        >
            {pending ? (
                <Skeleton
                    className="w-full"
                    style={{ height: PRIMARY_HEIGHT + SECONDARY_HEIGHT }}
                />
            ) : (
                <>
                    <ChartBlock
                        label={GMV_LABEL}
                        value={windowTotal(months, "gmv")}
                    >
                        <ColumnChart
                            data={measureSeries(months, "gmv")}
                            xKey="month"
                            series={ANALYTICS_SERIES.gmv}
                            height={PRIMARY_HEIGHT}
                            xAxis={false}
                            faded={faded}
                            {...measureAxis("gmv")}
                        />
                    </ChartBlock>
                    <ChartBlock
                        label={DEALS_LABEL}
                        value={windowTotal(months, "deals")}
                    >
                        <ColumnChart
                            data={measureSeries(months, "deals")}
                            xKey="month"
                            series={ANALYTICS_SERIES.deals}
                            height={SECONDARY_HEIGHT}
                            faded={faded}
                            {...measureAxis("deals")}
                        />
                    </ChartBlock>
                </>
            )}
        </DeckPanel>
    );
}

AdminAnalyticsVolume.displayName = "AdminAnalyticsVolume";
