import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { ToggleRow } from "@/components/ui/toggle-row";
import { AlertRow, type Alert } from "@/components/dashboard/alert-row";

const alerts: Alert[] = [
    {
        id: "1",
        listingId: "1",
        type: "price-drop",
        title: "Price Reduction",
        description: "The price has been reduced by $150,000",
        address: "456 Oak Avenue, Beverly Hills, CA",
        price: 3200000,
        previousPrice: 3350000,
        timestamp: "2 hours ago",
        read: false,
    },
    {
        id: "2",
        listingId: "2",
        type: "new-listing",
        title: "New Listing Match",
        description: "A new property matching your criteria just listed",
        address: "678 Elm Street, Bel Air, CA",
        price: 3800000,
        timestamp: "5 hours ago",
        read: false,
    },
    {
        id: "3",
        listingId: "3",
        type: "under-offer",
        title: "Status Update",
        description: "This property is now under offer",
        address: "234 Oak Street, Bel Air, CA",
        timestamp: "1 day ago",
        read: true,
    },
    {
        id: "4",
        listingId: "4",
        type: "status-change",
        title: "Market Alert",
        description: "Market conditions in your favorite area have changed",
        address: "Beverly Hills, CA",
        timestamp: "2 days ago",
        read: true,
    },
];

const alertSettings = [
    {
        title: "Price Drops",
        description: "Get notified when saved properties drop in price",
        defaultChecked: true,
    },
    {
        title: "New Listings",
        description: "Get notified about new properties matching your criteria",
        defaultChecked: true,
    },
    {
        title: "Market Updates",
        description: "Get notified about market conditions in your areas",
        defaultChecked: true,
    },
];

export default function AlertsPage() {
    const unread = alerts.filter((alert) => !alert.read).length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Price Alerts"
                description={`${unread} new alert${unread !== 1 ? "s" : ""}`}
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                            Mark All Read
                        </Button>
                        <Button variant="secondary" size="sm">
                            Preferences
                        </Button>
                    </div>
                }
            />

            {alerts.length > 0 ? (
                <div className="space-y-3">
                    {alerts.map((alert) => (
                        <AlertRow key={alert.id} alert={alert} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={Bell}
                    title="No alerts yet"
                    description="Alerts about your saved properties will appear here."
                    action={
                        <Link href="/search">
                            <Button variant="primary" size="sm">
                                Browse Properties
                            </Button>
                        </Link>
                    }
                />
            )}

            <Panel title="Alert Settings">
                <div className="space-y-2">
                    {alertSettings.map((setting) => (
                        <ToggleRow
                            key={setting.title}
                            title={setting.title}
                            description={setting.description}
                            defaultChecked={setting.defaultChecked}
                        />
                    ))}
                </div>
            </Panel>
        </div>
    );
}
