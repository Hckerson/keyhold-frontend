import { BarChart3 } from "lucide-react";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { DeltaChip } from "@/components/ui/delta-chip";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { RegisterSection } from "@/components/patterns/register-section";
import { PanelLink } from "@/components/features/shared/panel-link";
import { BusinessFigureTable } from "@/components/features/admin/business-figure-table";
import { ADMIN_ROUTES } from "@/lib/constants";
import { GMV_SERIES, type GmvReading } from "@/lib/data/admin-overview";
import { formatMillions } from "@/lib/utils";
import type { BusinessFigure, LifetimeVolume } from "@/lib/types";

const INDEX = "03";
const TITLE = "Business";
const ACTION = "Payments";
const EMPTY_TITLE = "No settled volume yet";
const EMPTY_LEDE = "Monthly GMV charts once the first deal settles.";
const LOADING_READING = "Reading monthly volume";
const NO_VOLUME = "$0";
const CHART_HEIGHT = 200;
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
}

export function AdminOverviewBusiness({
    reading,
    months,
    figures,
    lifetime,
    pending,
}: AdminOverviewBusinessProps) {
    return (
        <RegisterSection
            index={INDEX}
            title={TITLE}
            figure={reading ? formatMillions(reading.value, 1) : NO_VOLUME}
            figureAside={
                reading?.delta && (
                    <DeltaChip
                        value={reading.delta.label}
                        direction={reading.delta.direction}
                    />
                )
            }
            reading={
                reading
                    ? `${reading.month} GMV · est. commissions ${reading.commissionEstimate} at ${reading.commissionRate} · ${volumeLine(lifetime)}`
                    : pending
                      ? LOADING_READING
                      : volumeLine(lifetime)
            }
            action={<PanelLink href={ADMIN_ROUTES.payments} label={ACTION} />}
            pending={pending}
        >
            <div className="flex flex-col gap-4">
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
                    <Skeleton
                        className="w-full"
                        style={{ height: CHART_HEIGHT }}
                    />
                ) : (
                    <EmptyState
                        icon={BarChart3}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
                <BusinessFigureTable figures={figures} />
            </div>
        </RegisterSection>
    );
}

AdminOverviewBusiness.displayName = "AdminOverviewBusiness";
