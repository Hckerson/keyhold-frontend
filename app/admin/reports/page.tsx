import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReportMetric {
    label: string;
    value: string | number;
    trend: string;
    isPositive: boolean;
}

const metrics: ReportMetric[] = [
    {
        label: "Total GMV (YTD)",
        value: "$847M",
        trend: "+22% vs 2023",
        isPositive: true,
    },
    {
        label: "Active Listings",
        value: 342,
        trend: "+18% month-over-month",
        isPositive: true,
    },
    {
        label: "User Growth",
        value: "+14%",
        trend: "1,247 active users",
        isPositive: true,
    },
    {
        label: "Avg Transaction Value",
        value: "$2.47M",
        trend: "+8% vs market",
        isPositive: true,
    },
];

interface RegionMetric {
    region: string;
    listings: number;
    volume: number;
    avgPrice: number;
}

const regionData: RegionMetric[] = [
    { region: "Beverly Hills", listings: 87, volume: 285, avgPrice: 3.2 },
    { region: "Bel Air", listings: 56, volume: 198, avgPrice: 3.5 },
    { region: "West Hollywood", listings: 72, volume: 156, avgPrice: 2.1 },
    { region: "Malibu", listings: 45, volume: 142, avgPrice: 3.1 },
    { region: "Santa Monica", listings: 82, volume: 166, avgPrice: 2.0 },
];

export default function AdminReportsPage() {
    const totalVolume = regionData.reduce((sum, r) => sum + r.volume, 0);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h3 font-display text-text font-light">
                        Analytics & Reports
                    </h1>
                    <p className="text-text-secondary mt-2">
                        Platform performance metrics and market insights
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="text-sm">
                        Download Report
                    </Button>
                    <Button variant="primary" className="text-sm">
                        Generate Custom
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <Card key={metric.label}>
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <p className="text-text-secondary text-sm">
                                    {metric.label}
                                </p>
                                <p className="text-h4 text-text font-light">
                                    {metric.value}
                                </p>
                                <p
                                    className={`text-xs ${metric.isPositive ? "text-success" : "text-error"}`}
                                >
                                    {metric.trend}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Market by Region</CardTitle>
                        <CardDescription>
                            Listing volume and average sale prices
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {regionData.map((region) => (
                                <div key={region.region}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-text text-sm font-medium">
                                            {region.region}
                                        </span>
                                        <span className="text-text-secondary text-sm">
                                            ${(region.volume / 1000).toFixed(0)}
                                            M
                                        </span>
                                    </div>
                                    <div className="bg-primary-dark h-2 w-full overflow-hidden rounded-full">
                                        <div
                                            className="from-accent to-accent-dark h-full bg-linear-to-r"
                                            style={{
                                                width: `${(region.volume / totalVolume) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="text-text-secondary mt-1 flex justify-between text-xs">
                                        <span>{region.listings} listings</span>
                                        <span>
                                            Avg: ${region.avgPrice.toFixed(1)}M
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span className="text-text-secondary text-sm">
                                        Buyers (58%)
                                    </span>
                                    <span className="text-text text-sm font-medium">
                                        722
                                    </span>
                                </div>
                                <div className="bg-primary-dark h-2 w-full overflow-hidden rounded-full">
                                    <div
                                        className="bg-info h-full w-full rounded-full"
                                        style={{ width: "58%" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span className="text-text-secondary text-sm">
                                        Agents (35%)
                                    </span>
                                    <span className="text-text text-sm font-medium">
                                        435
                                    </span>
                                </div>
                                <div className="bg-primary-dark h-2 w-full overflow-hidden rounded-full">
                                    <div
                                        className="bg-accent h-full rounded-full"
                                        style={{ width: "35%" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span className="text-text-secondary text-sm">
                                        Admins (7%)
                                    </span>
                                    <span className="text-text text-sm font-medium">
                                        90
                                    </span>
                                </div>
                                <div className="bg-primary-dark h-2 w-full overflow-hidden rounded-full">
                                    <div
                                        className="bg-error h-full rounded-full"
                                        style={{ width: "7%" }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tier Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span className="text-text-secondary text-sm">
                                        Standard
                                    </span>
                                    <span className="text-text text-sm font-medium">
                                        845 (68%)
                                    </span>
                                </div>
                                <div className="bg-primary-dark h-2 w-full overflow-hidden rounded-full">
                                    <div
                                        className="bg-text-secondary/50 h-full rounded-full"
                                        style={{ width: "68%" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span className="text-text-secondary text-sm">
                                        Premium
                                    </span>
                                    <span className="text-text text-sm font-medium">
                                        315 (25%)
                                    </span>
                                </div>
                                <div className="bg-primary-dark h-2 w-full overflow-hidden rounded-full">
                                    <div
                                        className="bg-info h-full rounded-full"
                                        style={{ width: "25%" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span className="text-text-secondary text-sm">
                                        Platinum
                                    </span>
                                    <span className="text-text text-sm font-medium">
                                        87 (7%)
                                    </span>
                                </div>
                                <div className="bg-primary-dark h-2 w-full overflow-hidden rounded-full">
                                    <div
                                        className="bg-accent h-full rounded-full"
                                        style={{ width: "7%" }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
