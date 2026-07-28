"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { AlertRow } from "@/components/features/dashboard/alert-row";
import { AlertPreferenceRow } from "@/components/features/dashboard/alert-preference-row";
import {
    initialAlerts,
    initialPreferences,
    preferenceCopy,
    type AlertPreference,
    type ChannelKey,
    type PreferenceKey,
} from "@/lib/data/alerts";
import type { Alert } from "@/lib/types";

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
                    {preferenceCopy.map((item) => (
                        <AlertPreferenceRow
                            key={item.key}
                            item={item}
                            preference={preferences[item.key]}
                            threshold={threshold}
                            onThresholdChange={setThreshold}
                            onToggleEnabled={() => toggleEnabled(item.key)}
                            onToggleChannel={(channel) =>
                                toggleChannel(item.key, channel)
                            }
                        />
                    ))}
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
