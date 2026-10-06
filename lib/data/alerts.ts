import { Bell, Home, Radio, TrendingDown } from "lucide-react";
import {
    ALERT_TYPES,
    ALERT_TYPE_KEYS,
    RECENCY_BANDS,
    RECENCY_BAND_KEYS,
    type RecencyBand,
} from "@/lib/config/alert-tones";
import type {
    Alert,
    AlertReadFilter,
    AlertTypeFilter,
    StatDatum,
} from "@/lib/types";

export const READ_FILTERS: { id: AlertReadFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "read", label: "Read" },
];

export const TYPE_OPTIONS: { value: AlertTypeFilter; label: string }[] = [
    { value: "all", label: "Every signal" },
    ...ALERT_TYPE_KEYS.map((id) => ({
        value: id,
        label: ALERT_TYPES[id].label,
    })),
];

export const recencyBandOf = (alert: Alert): RecencyBand =>
    RECENCY_BAND_KEYS.find(
        (id) => alert.minutesAgo < RECENCY_BANDS[id].ceiling,
    ) ?? "earlier";

export const unreadCount = (alerts: Alert[]) =>
    alerts.filter((alert) => !alert.read).length;

export const trackedProperties = (alerts: Alert[]) =>
    new Set(
        alerts
            .map((alert) => alert.listingId)
            .filter((id): id is string => id !== null),
    ).size;

export const matchesFilters = (
    alert: Alert,
    read: AlertReadFilter,
    type: AlertTypeFilter,
) => {
    if (read === "unread" && alert.read) return false;
    if (read === "read" && !alert.read) return false;
    return type === "all" || alert.type === type;
};

export const countByRead = (
    alerts: Alert[],
): Record<AlertReadFilter, number> => ({
    all: alerts.length,
    unread: unreadCount(alerts),
    read: alerts.length - unreadCount(alerts),
});

export const rankAlerts = (alerts: Alert[]) =>
    [...alerts].sort(
        (a, b) =>
            Number(!b.read) - Number(!a.read) ||
            ALERT_TYPES[b.type].rank - ALERT_TYPES[a.type].rank ||
            a.minutesAgo - b.minutesAgo,
    );

export const markRead = (alerts: Alert[], id: string) =>
    alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert));

export const markAllRead = (alerts: Alert[]) =>
    alerts.map((alert) => ({ ...alert, read: true }));

export const alertStats = (alerts: Alert[]): StatDatum[] => [
    {
        id: "unread",
        icon: Bell,
        label: "Unread",
        value: `${unreadCount(alerts)}`,
        tone: "accent",
    },
    {
        id: "live",
        icon: Radio,
        label: "Live",
        value: `${alerts.filter((alert) => recencyBandOf(alert) === "live").length}`,
        tone: "success",
    },
    {
        id: "signals",
        icon: TrendingDown,
        label: "Signal types",
        value: `${new Set(alerts.map((alert) => alert.type)).size}`,
        tone: "info",
    },
    {
        id: "tracked",
        icon: Home,
        label: "Properties",
        value: `${trackedProperties(alerts)}`,
        tone: "warning",
    },
];

export const alertsSummary = (alerts: Alert[]) =>
    `${unreadCount(alerts)} unread · ${trackedProperties(alerts)} properties tracked`;
