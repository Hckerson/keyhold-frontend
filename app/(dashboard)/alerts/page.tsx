import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Alert {
    id: string;
    type: "price-drop" | "new-listing" | "under-offer" | "status-change";
    title: string;
    description: string;
    address: string;
    property?: {
        price?: number;
        previousPrice?: number;
        imageUrl?: string;
    };
    timestamp: string;
    read: boolean;
}

const alerts: Alert[] = [
    {
        id: "1",
        type: "price-drop",
        title: "Price Reduction",
        description: "The price has been reduced by $150,000",
        address: "456 Oak Avenue, Beverly Hills, CA",
        property: {
            price: 3200000,
            previousPrice: 3350000,
        },
        timestamp: "2 hours ago",
        read: false,
    },
    {
        id: "2",
        type: "new-listing",
        title: "New Listing Match",
        description: "A new property matching your criteria just listed",
        address: "678 Elm Street, Bel Air, CA",
        property: {
            price: 3800000,
        },
        timestamp: "5 hours ago",
        read: false,
    },
    {
        id: "3",
        type: "under-offer",
        title: "Status Update",
        description: "This property is now under offer",
        address: "234 Oak Street, Bel Air, CA",
        timestamp: "1 day ago",
        read: true,
    },
    {
        id: "4",
        type: "status-change",
        title: "Market Alert",
        description: "Market conditions in your favorite area have changed",
        address: "Beverly Hills, CA",
        timestamp: "2 days ago",
        read: true,
    },
];

const getAlertIcon = (type: string) => {
    switch (type) {
        case "price-drop":
            return "📉";
        case "new-listing":
            return "✨";
        case "under-offer":
            return "🏠";
        case "status-change":
            return "📊";
        default:
            return "🔔";
    }
};

const getAlertColor = (type: string) => {
    switch (type) {
        case "price-drop":
            return "border-success/20 bg-success/5";
        case "new-listing":
            return "border-accent/20 bg-accent/5";
        case "under-offer":
            return "border-warning/20 bg-warning/5";
        case "status-change":
            return "border-info/20 bg-info/5";
        default:
            return "border-border";
    }
};

export default function AlertsPage() {
    const unreadCount = alerts.filter((a) => !a.read).length;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h3 font-display text-text font-light">
                        Price Alerts
                    </h1>
                    <p className="text-text-secondary mt-2">
                        {unreadCount} new alert{unreadCount !== 1 ? "s" : ""}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="text-sm">
                        Mark All Read
                    </Button>
                    <Button variant="secondary" className="text-sm">
                        Preferences
                    </Button>
                </div>
            </div>

            <div className="space-y-3">
                {alerts.length > 0 ? (
                    alerts.map((alert) => (
                        <Link
                            key={alert.id}
                            href={`/listing/${alert.id}`}
                            className="group block"
                        >
                            <Card
                                className={`hover:border-accent/50 transition-all ${getAlertColor(alert.type)} ${
                                    !alert.read
                                        ? "border-l-accent border-l-2"
                                        : ""
                                }`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 text-2xl">
                                            {getAlertIcon(alert.type)}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-text group-hover:text-accent text-sm font-medium transition-colors">
                                                        {alert.title}
                                                    </h3>
                                                    <p className="text-text-secondary mt-1 text-sm">
                                                        {alert.description}
                                                    </p>
                                                    <p className="text-text mt-2 text-sm font-medium">
                                                        {alert.address}
                                                    </p>

                                                    {alert.property && (
                                                        <div className="mt-3 flex gap-6 text-sm">
                                                            <div>
                                                                <span className="text-text-secondary">
                                                                    Current:{" "}
                                                                </span>
                                                                <span className="text-text font-medium">
                                                                    $
                                                                    {(alert
                                                                        .property
                                                                        .price
                                                                        ? alert
                                                                              .property
                                                                              .price /
                                                                          1000000
                                                                        : 0
                                                                    ).toFixed(
                                                                        2,
                                                                    )}
                                                                    M
                                                                </span>
                                                            </div>
                                                            {alert.property
                                                                .previousPrice && (
                                                                <div>
                                                                    <span className="text-text-secondary">
                                                                        Was:{" "}
                                                                    </span>
                                                                    <span className="text-text-secondary font-medium line-through">
                                                                        $
                                                                        {(
                                                                            alert
                                                                                .property
                                                                                .previousPrice /
                                                                            1000000
                                                                        ).toFixed(
                                                                            2,
                                                                        )}
                                                                        M
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-shrink-0 text-right">
                                                    <p className="text-text-secondary text-xs">
                                                        {alert.timestamp}
                                                    </p>
                                                    {!alert.read && (
                                                        <div className="bg-accent mt-2 h-2 w-2 rounded-full" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-text-secondary mb-6">
                                No alerts yet
                            </p>
                            <Link href="/search" className="inline-block">
                                <Button variant="primary">
                                    Start Browsing Properties
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Alert Settings</CardTitle>
                    <CardDescription>
                        Customize which alerts you receive
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-primary-dark flex items-center justify-between rounded-lg p-3">
                        <div>
                            <p className="text-text text-sm font-medium">
                                Price Drops
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                Get notified when saved properties drop in price
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4"
                        />
                    </div>

                    <div className="bg-primary-dark flex items-center justify-between rounded-lg p-3">
                        <div>
                            <p className="text-text text-sm font-medium">
                                New Listings
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                Get notified about new properties matching your
                                criteria
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4"
                        />
                    </div>

                    <div className="bg-primary-dark flex items-center justify-between rounded-lg p-3">
                        <div>
                            <p className="text-text text-sm font-medium">
                                Market Updates
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                Get notified about market conditions in your
                                areas
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
