import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface StatCard {
    label: string;
    value: string | number;
    change?: string;
    href?: string;
}

const stats: StatCard[] = [
    { label: "Saved Listings", value: 8, href: "/dashboard/saved" },
    { label: "Active Offers", value: 2, href: "/dashboard/offers" },
    { label: "Scheduled Viewings", value: 3, href: "/dashboard/viewings" },
    { label: "New Messages", value: 1, href: "/dashboard/messages" },
];

const recentActivity = [
    {
        id: 1,
        type: "viewing",
        title: "Viewing Scheduled",
        description:
            "Your viewing for 456 Oak Avenue has been confirmed for today at 3:00 PM",
        time: "2 hours ago",
    },
    {
        id: 2,
        type: "offer",
        title: "Offer Accepted",
        description:
            "Your offer of $2.95M for 789 Sunset Blvd has been accepted",
        time: "5 hours ago",
    },
    {
        id: 3,
        type: "message",
        title: "New Message",
        description:
            "Your concierge agent has sent you a message about 234 Oak Street",
        time: "1 day ago",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-h3 font-display text-text mb-2 font-light">
                    Welcome back, John
                </h1>
                <p className="text-text-secondary">
                    Here's what's happening with your property journey
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href || "#"}
                        className="group"
                    >
                        <Card className="hover:border-accent/50 h-full transition-colors">
                            <CardContent className="pt-6">
                                <div className="space-y-2">
                                    <p className="text-text-secondary text-sm">
                                        {stat.label}
                                    </p>
                                    <p className="text-h4 text-text font-light">
                                        {stat.value}
                                    </p>
                                    {stat.change && (
                                        <p className="text-success text-xs">
                                            {stat.change}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Latest updates on your searches and offers
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Continue where you left off
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <Link href="/search" className="block">
                                    <Button
                                        variant="secondary"
                                        className="w-full justify-center"
                                    >
                                        Browse Properties
                                    </Button>
                                </Link>
                                <Link href="/dashboard/saved" className="block">
                                    <Button
                                        variant="secondary"
                                        className="w-full justify-center"
                                    >
                                        View Saved
                                    </Button>
                                </Link>
                                <Link
                                    href="/dashboard/offers"
                                    className="block"
                                >
                                    <Button
                                        variant="secondary"
                                        className="w-full justify-center"
                                    >
                                        Make Offer
                                    </Button>
                                </Link>
                                <Link
                                    href="/dashboard/viewings"
                                    className="block"
                                >
                                    <Button
                                        variant="secondary"
                                        className="w-full justify-center"
                                    >
                                        Schedule Viewing
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-h5">
                                Next Viewing
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-text-secondary text-sm">
                                    456 Oak Avenue
                                </p>
                                <p className="text-h6 text-text mt-1 font-light">
                                    $3.2M
                                </p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">
                                        Today
                                    </span>
                                    <span className="text-text font-medium">
                                        3:00 PM
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">
                                        Agent
                                    </span>
                                    <span className="text-text font-medium">
                                        Sarah Chen
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                className="w-full text-sm"
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-h5">
                                Price Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="bg-success/10 border-success/20 rounded-lg border p-3">
                                <p className="text-success font-medium">
                                    3 new alerts
                                </p>
                                <p className="text-text-secondary mt-1 text-xs">
                                    Price drops in your saved listings
                                </p>
                            </div>
                            <Link href="/dashboard/alerts" className="block">
                                <Button
                                    variant="secondary"
                                    className="w-full text-sm"
                                >
                                    View All Alerts
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
