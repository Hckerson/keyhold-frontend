import { Bell, Home, Radio, TrendingDown } from "lucide-react";
import {
    ALERT_CHANNELS,
    ALERT_CHANNEL_KEYS,
    ALERT_TYPES,
    ALERT_TYPE_KEYS,
    RECENCY_BANDS,
    RECENCY_BAND_KEYS,
    type RecencyBand,
} from "@/lib/config/alert-tones";
import type {
    Alert,
    AlertChannel,
    AlertPreference,
    AlertType,
    ShareDatum,
    StatDatum,
} from "@/lib/types";
import type { NotificationPreference } from "@/lib/validations/notification";
import { percentOf, sum } from "@/lib/utils";

export type ReadFilter = "all" | "unread" | "read";

export type TypeFilter = AlertType | "all";

export const READ_FILTERS: { id: ReadFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "read", label: "Read" },
];

export const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
    { value: "all", label: "Every signal" },
    ...ALERT_TYPE_KEYS.map((id) => ({
        value: id,
        label: ALERT_TYPES[id].label,
    })),
];

export const DEFAULT_THRESHOLD = "50000";

export const DEFAULT_PREFERENCE: AlertPreference = {
    enabled: true,
    channels: { email: true, sms: false, inApp: true },
};

export const toPreferenceMap = (
    stored: NotificationPreference[],
): Record<AlertType, AlertPreference> => {
    const byType = new Map(stored.map((entry) => [entry.type, entry]));

    return Object.fromEntries(
        ALERT_TYPE_KEYS.map((id) => {
            const entry = byType.get(id);
            return [
                id,
                entry
                    ? {
                          enabled: entry.enabled,
                          channels: {
                              email: entry.email,
                              sms: entry.sms,
                              inApp: entry.inApp,
                          },
                      }
                    : DEFAULT_PREFERENCE,
            ];
        }),
    ) as Record<AlertType, AlertPreference>;
};

export const emptyPreferences = () => toPreferenceMap([]);

export const toPreferenceList = (
    preferences: Record<AlertType, AlertPreference>,
): NotificationPreference[] =>
    ALERT_TYPE_KEYS.map((type) => ({
        type,
        enabled: preferences[type].enabled,
        email: preferences[type].channels.email,
        sms: preferences[type].channels.sms,
        inApp: preferences[type].channels.inApp,
    }));

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
    read: ReadFilter,
    type: TypeFilter,
) => {
    if (read === "unread" && alert.read) return false;
    if (read === "read" && !alert.read) return false;
    return type === "all" || alert.type === type;
};

export const countByRead = (alerts: Alert[]): Record<ReadFilter, number> => ({
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

export const toggleEnabled = (
    preferences: Record<AlertType, AlertPreference>,
    key: AlertType,
): Record<AlertType, AlertPreference> => ({
    ...preferences,
    [key]: { ...preferences[key], enabled: !preferences[key].enabled },
});

export const toggleChannel = (
    preferences: Record<AlertType, AlertPreference>,
    key: AlertType,
    channel: AlertChannel,
): Record<AlertType, AlertPreference> => ({
    ...preferences,
    [key]: {
        ...preferences[key],
        channels: {
            ...preferences[key].channels,
            [channel]: !preferences[key].channels[channel],
        },
    },
});

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

export interface AlertVolume {
    count: number;
    percent: number;
}

export const typeVolumes = (alerts: Alert[]): Record<AlertType, AlertVolume> =>
    Object.fromEntries(
        ALERT_TYPE_KEYS.map((id) => {
            const count = alerts.filter((alert) => alert.type === id).length;
            return [id, { count, percent: percentOf(count, alerts.length) }];
        }),
    ) as Record<AlertType, AlertVolume>;

export const typeShares = (alerts: Alert[]): ShareDatum[] => {
    const volumes = typeVolumes(alerts);

    return ALERT_TYPE_KEYS.map((id) => ({
        id,
        icon: ALERT_TYPES[id].icon,
        label: ALERT_TYPES[id].label,
        value: `${volumes[id].count}`,
        percent: volumes[id].percent,
        tone: ALERT_TYPES[id].chartTone,
    }));
};

export const recencyShares = (alerts: Alert[]): ShareDatum[] =>
    RECENCY_BAND_KEYS.map((id) => {
        const count = alerts.filter(
            (alert) => recencyBandOf(alert) === id,
        ).length;
        return {
            id,
            icon: RECENCY_BANDS[id].icon,
            label: RECENCY_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, alerts.length),
            tone: RECENCY_BANDS[id].tone,
        };
    });

export const channelShares = (alerts: Alert[]): ShareDatum[] =>
    ALERT_CHANNEL_KEYS.map((id) => {
        const count = alerts.filter((alert) => alert.channel === id).length;
        return {
            id,
            icon: ALERT_CHANNELS[id].icon,
            label: ALERT_CHANNELS[id].label,
            value: `${count}`,
            percent: percentOf(count, alerts.length),
            tone: ALERT_CHANNELS[id].chartTone,
        };
    });

export const alertsSummary = (alerts: Alert[]) =>
    `${unreadCount(alerts)} unread · ${trackedProperties(alerts)} properties tracked`;

export const ALERT_TYPE_COUNT = ALERT_TYPE_KEYS.length;

export const enabledAlertCount = (
    preferences: Record<AlertType, AlertPreference>,
) => ALERT_TYPE_KEYS.filter((id) => preferences[id].enabled).length;

export const alertDeliveryCount = (
    preferences: Record<AlertType, AlertPreference>,
) =>
    sum(
        ALERT_TYPE_KEYS.filter((id) => preferences[id].enabled).map(
            (id) =>
                ALERT_CHANNEL_KEYS.filter(
                    (channel) => preferences[id].channels[channel],
                ).length,
        ),
    );

export const arePreferencesDirty = (
    preferences: Record<AlertType, AlertPreference>,
    baseline: Record<AlertType, AlertPreference>,
) =>
    ALERT_TYPE_KEYS.some(
        (id) =>
            preferences[id].enabled !== baseline[id].enabled ||
            ALERT_CHANNEL_KEYS.some(
                (channel) =>
                    preferences[id].channels[channel] !==
                    baseline[id].channels[channel],
            ),
    );

export const deliverySummary = (
    preferences: Record<AlertType, AlertPreference>,
) => `${enabledAlertCount(preferences)} of ${ALERT_TYPE_COUNT} signals on`;
