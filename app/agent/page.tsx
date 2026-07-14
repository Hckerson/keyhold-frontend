import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface PipelineStage {
    name: string;
    count: number;
    value: number;
}

const pipelineStages: PipelineStage[] = [
    { name: "Leads", count: 12, value: 0 },
    { name: "Showing", count: 8, value: 18400000 },
    { name: "Under Offer", count: 3, value: 9850000 },
    { name: "Closing", count: 2, value: 6200000 },
];

const recentActivity = [
    {
        id: 1,
        type: "offer",
        title: "Offer Received",
        description: "$3.1M offer on 456 Oak Avenue",
        time: "2 hours ago",
    },
    {
        id: 2,
        type: "showing",
        title: "Property Showed",
        description: "789 Sunset Blvd shown to client",
        time: "5 hours ago",
    },
    {
        id: 3,
        type: "listing",
        title: "New Listing Posted",
        description: "234 Oak Street listed at $4.5M",
        time: "1 day ago",
    },
];

export default function AgentDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-h3 font-display text-text mb-2 font-light">
                    Welcome back, Sarah
                </h1>
                <p className="text-text-secondary">
                    Your sales pipeline and performance overview
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/agent/pipeline" className="group">
                    <Card className="hover:border-accent/50 h-full transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <p className="text-text-secondary text-sm">
                                    Total Pipeline
                                </p>
                                <p className="text-h4 text-text font-light">
                                    $34.45M
                                </p>
                                <p className="text-accent text-xs">
                                    25 active deals
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/agent/listings" className="group">
                    <Card className="hover:border-accent/50 h-full transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <p className="text-text-secondary text-sm">
                                    Active Listings
                                </p>
                                <p className="text-h4 text-text font-light">
                                    14
                                </p>
                                <p className="text-success text-xs">
                                    8 new this month
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/agent/leads" className="group">
                    <Card className="hover:border-accent/50 h-full transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <p className="text-text-secondary text-sm">
                                    Active Leads
                                </p>
                                <p className="text-h4 text-text font-light">
                                    12
                                </p>
                                <p className="text-warning text-xs">
                                    3 hot prospects
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/agent/analytics" className="group">
                    <Card className="hover:border-accent/50 h-full transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <p className="text-text-secondary text-sm">
                                    Closed This Year
                                </p>
                                <p className="text-h4 text-text font-light">
                                    $42.3M
                                </p>
                                <p className="text-success text-xs">
                                    +12% vs last year
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Pipeline</CardTitle>
                            <CardDescription>
                                Current deals by stage
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pipelineStages.map((stage) => (
                                    <div key={stage.name}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <h4 className="text-text text-sm font-medium">
                                                {stage.name}
                                            </h4>
                                            <span className="text-text-secondary text-sm">
                                                {stage.count} deals
                                            </span>
                                        </div>
                                        <div className="bg-primary-dark h-2 w-full overflow-hidden rounded-full">
                                            <div
                                                className="from-accent to-accent-dark h-full bg-gradient-to-r"
                                                style={{
                                                    width: `${Math.min((stage.count / 12) * 100, 100)}%`,
                                                }}
                                            />
                                        </div>
                                        {stage.value > 0 && (
                                            <p className="text-text-secondary mt-1 text-xs">
                                                $
                                                {(
                                                    stage.value / 1000000
                                                ).toFixed(2)}
                                                M in pipeline
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Latest updates on your deals
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="border-border flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                                    >
                                        <div className="bg-accent mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-text text-sm font-medium">
                                                {activity.title}
                                            </h4>
                                            <p className="text-text-secondary mt-1 text-sm">
                                                {activity.description}
                                            </p>
                                            <p className="text-text-secondary mt-2 text-xs">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-h5">
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/agent/listings" className="block">
                                <Button
                                    variant="secondary"
                                    className="w-full text-sm"
                                >
                                    List Property
                                </Button>
                            </Link>
                            <Link href="/agent/leads" className="block">
                                <Button
                                    variant="secondary"
                                    className="w-full text-sm"
                                >
                                    Add Lead
                                </Button>
                            </Link>
                            <Link href="/agent/calendar" className="block">
                                <Button
                                    variant="secondary"
                                    className="w-full text-sm"
                                >
                                    Schedule Showing
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-h5">
                                This Month
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div>
                                <p className="text-text-secondary">Showings</p>
                                <p className="text-h6 text-accent mt-1 font-light">
                                    24
                                </p>
                            </div>
                            <div className="border-border border-t pt-3">
                                <p className="text-text-secondary">
                                    Offers Received
                                </p>
                                <p className="text-h6 text-accent mt-1 font-light">
                                    8
                                </p>
                            </div>
                            <div className="border-border border-t pt-3">
                                <p className="text-text-secondary">
                                    Closed Deals
                                </p>
                                <p className="text-h6 text-success mt-1 font-light">
                                    2
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
