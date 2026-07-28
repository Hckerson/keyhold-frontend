"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { FormField } from "@/components/ui/form-field";
import { AlertRow, type Alert } from "@/components/dashboard/alert-row";

type ChannelKey = "email" | "sms" | "inApp";
type PreferenceKey =
    | "price-drops"
    | "new-listings"
    | "offer-responses"
    | "viewing-confirmations";

interface AlertPreference {
    enabled: boolean;
    channels: Record<ChannelKey, boolean>;
}

const microLabel =
    "text-text-muted font-mono text-[10px] font-medium tracking-wide uppercase";

const channels: { key: ChannelKey; label: string }[] = [
    { key: "email", label: "Email" },
    { key: "sms", label: "SMS" },
    { key: "inApp", label: "In-app" },
];

const preferenceCopy: {
    key: PreferenceKey;
    title: string;
    description: string;
}[] = [
    {
        key: "price-drops",
        title: "Price Drops",
        description:
            "Saved listings that drop by at least your chosen threshold",
    },
    {
        key: "new-listings",
        title: "New Listings",
        description: "New properties matching your saved search criteria",
    },
    {
        key: "offer-responses",
        title: "Offer Responses",
        description: "Seller accepts, counters or rejects one of your offers",
    },
    {
        key: "viewing-confirmations",
        title: "Viewing Confirmations",
        description: "An agent confirms, reschedules or cancels a viewing",
    },
];

const initialPreferences: Record<PreferenceKey, AlertPreference> = {
    "price-drops": {
        enabled: true,
        channels: { email: true, sms: false, inApp: true },
    },
    "new-listings": {
        enabled: true,
        channels: { email: true, sms: false, inApp: true },
    },
    "offer-responses": {
        enabled: true,
        channels: { email: true, sms: true, inApp: true },
    },
    "viewing-confirmations": {
        enabled: true,
        channels: { email: false, sms: true, inApp: true },
    },
};

const initialAlerts: Alert[] = [
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
        type: "offer-response",
        title: "Counter Offer Received",
        description: "The seller countered your offer at $4,400,000",
        address: "234 Oak Street, Bel Air, CA",
        timestamp: "yesterday",
        read: false,
    },
    {
        id: "4",
        listingId: "4",
        type: "viewing-confirmation",
        title: "Viewing Confirmed",
        description: "Your tour on Jul 28 at 3:00 PM is confirmed",
        address: "456 Oak Avenue, Beverly Hills, CA",
        timestamp: "1 day ago",
        read: true,
    },
    {
        id: "5",
        listingId: "5",
        type: "under-offer",
        title: "Status Update",
        description: "This property is now under offer",
        address: "567 Palm Drive, Malibu, CA",
        timestamp: "2 days ago",
        read: true,
    },
];

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
    const [preferences, setPreferences] =
        useState<Record<PreferenceKey, AlertPreference>>(initialPreferences);
    const [threshold, setThreshold] = useState("50000");

    const unread = alerts.filter((alert) => !alert.read).length;

    const markRead = (id: string) => {
        setAlerts((prev) =>
            prev.map((alert) =>
                alert.id === id ? { ...alert, read: true } : alert,
            ),
        );
    };

    const markAllRead = () => {
        setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
    };

    const toggleEnabled = (key: PreferenceKey) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: { ...prev[key], enabled: !prev[key].enabled },
        }));
    };

    const toggleChannel = (key: PreferenceKey, channel: ChannelKey) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                channels: {
                    ...prev[key].channels,
                    [channel]: !prev[key].channels[channel],
                },
            },
        }));
    };

    return (
        <div className="space-y-3">
            <PageHeader
                title="Alerts"
                description={`${unread} unread alert${unread !== 1 ? "s" : ""}`}
                action={
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={unread === 0}
                        onClick={markAllRead}
                    >
                        <CheckCheck
                            size={12}
                            strokeWidth={1.5}
                            className="mr-1.5"
                        />
                        Mark All Read
                    </Button>
                }
            />

            <Panel
                title="Alert Settings"
                description="Choose what fires and where it lands"
            >
                <div className="space-y-2">
                    {preferenceCopy.map((item) => {
                        const preference = preferences[item.key];
                        return (
                            <div
                                key={item.key}
                                className="bg-background border-border-light rounded-lg border p-3"
                            >
                                <label className="flex cursor-pointer items-start justify-between gap-4">
                                    <span className="min-w-0">
                                        <span className="text-text block text-xs font-medium">
                                            {item.title}
                                        </span>
                                        <span className="text-text-secondary mt-0.5 block text-xs">
                                            {item.description}
                                        </span>
                                    </span>
                                    <Switch
                                        checked={preference.enabled}
                                        onChange={() => toggleEnabled(item.key)}
                                        aria-label={`Enable ${item.title} alerts`}
                                        className="shrink-0"
                                    />
                                </label>

                                {preference.enabled && (
                                    <div className="border-border-light mt-3 space-y-3 border-t pt-3">
                                        {item.key === "price-drops" && (
                                            <FormField
                                                label="Drop threshold"
                                                name="priceDropThreshold"
                                                value={threshold}
                                                onChange={(event) =>
                                                    setThreshold(
                                                        event.target.value,
                                                    )
                                                }
                                                prefix="$"
                                                inputMode="numeric"
                                                placeholder="50,000"
                                                className="max-w-56"
                                                hint={
                                                    <span className="text-text-muted text-xs">
                                                        Minimum reduction
                                                    </span>
                                                }
                                            />
                                        )}
                                        <div>
                                            <p className={microLabel}>
                                                Channels
                                            </p>
                                            <div className="mt-1.5 flex flex-wrap gap-4">
                                                {channels.map((channel) => (
                                                    <Checkbox
                                                        key={channel.key}
                                                        id={`${item.key}-${channel.key}`}
                                                        label={channel.label}
                                                        checked={
                                                            preference.channels[
                                                                channel.key
                                                            ]
                                                        }
                                                        onChange={() =>
                                                            toggleChannel(
                                                                item.key,
                                                                channel.key,
                                                            )
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Panel>

            <Panel title="Alert History" count={alerts.length}>
                {alerts.length > 0 ? (
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <AlertRow
                                key={alert.id}
                                alert={alert}
                                onMarkRead={markRead}
                            />
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
            </Panel>
        </div>
    );
}
