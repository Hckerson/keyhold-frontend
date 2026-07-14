import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface SystemMetric {
    label: string;
    value: string | number;
    status: "healthy" | "warning" | "critical";
}

const metrics: SystemMetric[] = [
    { label: "Total Users", value: "1,247", status: "healthy" },
    { label: "Active Listings", value: "342", status: "healthy" },
    { label: "Pending Verifications", value: 18, status: "warning" },
    { label: "Flagged Content", value: 3, status: "critical" },
];

const alerts = [
    {
        id: 1,
        type: "verification",
        title: "High-Value Agent Verification",
        description:
            "Robert Chen (Agent) requesting Platinum tier verification",
        time: "1 hour ago",
    },
    {
        id: 2,
        type: "content",
        title: "Inappropriate Listing Image",
        description: "Listing #4521 flagged for explicit content",
        time: "2 hours ago",
    },
    {
        id: 3,
        type: "transaction",
        title: "Large Transaction Alert",
        description: "$8.5M transaction pending escrow confirmation",
        time: "4 hours ago",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "healthy":
            return "text-success bg-success/10";
        case "warning":
            return "text-warning bg-warning/10";
        case "critical":
            return "text-error bg-error/10";
        default:
            return "text-text-secondary";
    }
};

const getAlertColor = (type: string) => {
    switch (type) {
        case "verification":
            return "border-l-accent";
        case "content":
            return "border-l-error";
        case "transaction":
            return "border-l-warning";
        default:
            return "border-l-text-secondary";
    }
};

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-h3 font-display text-text mb-2 font-light">
                    Admin Dashboard
                </h1>
                <p className="text-text-secondary">
                    System health, user management, and content moderation
                </p>
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
                                <div
                                    className={`inline-block rounded px-2 py-1 text-xs font-medium ${getStatusColor(metric.status)}`}
                                >
                                    {metric.status === "healthy" && "✓ Healthy"}
                                    {metric.status === "warning" &&
                                        "⚠ Attention"}
                                    {metric.status === "critical" &&
                                        "✕ Action Required"}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Alerts</CardTitle>
                            <CardDescription>
                                Recent notifications requiring attention
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {alerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`border-border flex gap-4 border-b border-l-2 pb-3 pl-4 last:border-b-0 last:pb-0 ${getAlertColor(alert.type)}`}
                                >
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-text text-sm font-medium">
                                            {alert.title}
                                        </h4>
                                        <p className="text-text-secondary mt-1 text-sm">
                                            {alert.description}
                                        </p>
                                        <p className="text-text-secondary mt-2 text-xs">
                                            {alert.time}
                                        </p>
                                    </div>
                                    <Link href="#" className="block">
                                        <Button
                                            variant="secondary"
                                            className="h-8 flex-shrink-0 text-xs"
                                        >
                                            Review
                                        </Button>
                                    </Link>
                                </div>
                            ))}
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
                            <Link href="/admin/users" className="block">
                                <Button
                                    variant="secondary"
                                    className="w-full text-sm"
                                >
                                    Manage Users
                                </Button>
                            </Link>
                            <Link href="/admin/listings" className="block">
                                <Button
                                    variant="secondary"
                                    className="w-full text-sm"
                                >
                                    Review Listings
                                </Button>
                            </Link>
                            <Link href="/admin/verifications" className="block">
                                <Button
                                    variant="secondary"
                                    className="w-full text-sm"
                                >
                                    Process Verifications
                                </Button>
                            </Link>
                            <Link href="/admin/reports" className="block">
                                <Button
                                    variant="secondary"
                                    className="w-full text-sm"
                                >
                                    View Reports
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-h5">
                                System Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div>
                                <p className="text-text-secondary mb-1">
                                    Database
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="bg-success h-2 w-2 rounded-full" />
                                    <span className="text-text font-medium">
                                        Operational
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-text-secondary mb-1">
                                    API Gateway
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="bg-success h-2 w-2 rounded-full" />
                                    <span className="text-text font-medium">
                                        Operational
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-text-secondary mb-1">
                                    File Storage
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="bg-success h-2 w-2 rounded-full" />
                                    <span className="text-text font-medium">
                                        Operational
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
