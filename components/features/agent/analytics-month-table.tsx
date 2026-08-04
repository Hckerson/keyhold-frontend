import { AnalyticsMonthRow } from "@/components/features/agent/analytics-month-row";
import type { MonthlyProduction } from "@/lib/data/agent-analytics";

const TABLE_CAPTION = "Monthly closings, volume against target and change";

export interface AnalyticsMonthTableProps {
    months: MonthlyProduction[];
}

export function AnalyticsMonthTable({ months }: AnalyticsMonthTableProps) {
    return (
        <table className="w-full">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label w-10 text-left">
                        Month
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-10 pl-3 text-right"
                    >
                        Sold
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Attainment
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        Volume
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        MoM
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {months.map((month, index) => (
                    <AnalyticsMonthRow
                        key={month.id}
                        month={month}
                        previousVolume={months[index - 1]?.volume}
                    />
                ))}
            </tbody>
        </table>
    );
}

AnalyticsMonthTable.displayName = "AnalyticsMonthTable";
