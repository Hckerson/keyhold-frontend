"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { ChartBlock } from "@/components/patterns/chart-block";
import { DeckPanel } from "@/components/patterns/deck-panel";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ANALYTICS_SERIES } from "@/lib/config/admin-analytics";
import { measureAxis } from "@/lib/config/report-measures";
import { ADMIN_ROUTES } from "@/lib/constants";
import { supplyReading, windowTotal } from "@/lib/data/admin-analytics";
import { measureSeries } from "@/lib/data/admin-reports-measures";
import type { ReportMonth } from "@/lib/types";

const TITLE = "Supply & demand";
const ACTION = "Users";
const MEMBERS_LABEL = "New members by month";
const LISTINGS_LABEL = "New listings by month";
const PRIMARY_HEIGHT = 152;
const SECONDARY_HEIGHT = 104;

export interface AdminAnalyticsSupplyProps {
    months: ReportMonth[];
    joiners: string;
    pending?: boolean;
}

export function AdminAnalyticsSupply({
    months,
    joiners,
    pending,
}: AdminAnalyticsSupplyProps) {
    const faded = (index: number) => months[index]?.partial ?? false;

    return (
        <DeckPanel
            title={TITLE}
            summary={pending ? undefined : supplyReading(months)}
            action={<PanelLink href={ADMIN_ROUTES.users} label={ACTION} />}
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
                        label={MEMBERS_LABEL}
                        value={windowTotal(months, "members")}
                        caption={joiners}
                    >
                        <ColumnChart
                            data={measureSeries(months, "members")}
                            xKey="month"
                            series={ANALYTICS_SERIES.members}
                            height={PRIMARY_HEIGHT}
                            xAxis={false}
                            faded={faded}
                            {...measureAxis("members")}
                        />
                    </ChartBlock>
                    <ChartBlock
                        label={LISTINGS_LABEL}
                        value={windowTotal(months, "listings")}
                    >
                        <ColumnChart
                            data={measureSeries(months, "listings")}
                            xKey="month"
                            series={ANALYTICS_SERIES.listings}
                            height={SECONDARY_HEIGHT}
                            faded={faded}
                            {...measureAxis("listings")}
                        />
                    </ChartBlock>
                </>
            )}
        </DeckPanel>
    );
}

AdminAnalyticsSupply.displayName = "AdminAnalyticsSupply";
