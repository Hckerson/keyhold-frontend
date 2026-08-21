import { Bell, Home, Radio, TrendingDown, Wallet } from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    ALERT_CHANNELS,
    ALERT_CHANNEL_KEYS,
    ALERT_TYPES,
    ALERT_TYPE_KEYS,
    RECENCY_BANDS,
    RECENCY_BAND_KEYS,
    type RecencyBand,
} from "@/lib/config/alert-tones";
import { propertyImage } from "@/lib/data/sample-images";
import type {
    Alert,
    AlertChannel,
    AlertPreference,
    AlertType,
} from "@/lib/types";
import type { NotificationPreference } from "@/lib/validations/notification";
import { formatCompactUsd, percentOf, sum } from "@/lib/utils";

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

export const initialAlerts: Alert[] = [
    {
        id: "oak-avenue-drop",
        listingId: "1",
        type: "PRICE_DROP",
        description:
            "The seller cut the ask by $150,000 after four weeks without a second offer. Your saved search still ranks it first on price per square foot.",
        address: "456 Oak Avenue",
        locality: "Beverly Hills",
        photo: propertyImage(0),
        price: 3_200_000,
        previousPrice: 3_350_000,
        minutesAgo: 42,
        channel: "email",
        read: false,
    },
    {
        id: "palisades-drop",
        listingId: "7",
        type: "PRICE_DROP",
        description:
            "A $250,000 reduction brings the bluff house inside your ceiling for the first time since it listed.",
        address: "18 Palisades Bluff",
        locality: "Pacific Palisades",
        photo: propertyImage(6),
        price: 8_150_000,
        previousPrice: 8_400_000,
        minutesAgo: 18,
        channel: "email",
        read: false,
    },
    {
        id: "montana-match",
        listingId: "8",
        type: "NEW_LISTING",
        description:
            "A new four-bedroom north of Montana matches your saved criteria on beds, lot size and locality.",
        address: "301 Montana Row",
        locality: "Santa Monica",
        photo: propertyImage(7),
        price: 3_950_000,
        minutesAgo: 28,
        channel: "inApp",
        read: false,
    },
    {
        id: "oak-street-counter",
        listingId: "3",
        type: "OFFER_RESPONSE",
        description:
            "The seller countered your $4,250,000 offer at $4,400,000 and asked for a 30-day close.",
        address: "234 Oak Street",
        locality: "Bel Air",
        photo: propertyImage(2),
        price: 4_400_000,
        previousPrice: 4_250_000,
        minutesAgo: 260,
        channel: "sms",
        read: false,
    },
    {
        id: "elm-street-match",
        listingId: "2",
        type: "NEW_LISTING",
        description:
            "A new listing on Elm Street matches your saved search on price band and school catchment.",
        address: "678 Elm Street",
        locality: "Bel Air",
        photo: propertyImage(1),
        price: 3_800_000,
        minutesAgo: 310,
        channel: "inApp",
        read: false,
    },
    {
        id: "oak-avenue-viewing",
        listingId: "1",
        type: "VIEWING_CONFIRMATION",
        description:
            "Your tour is confirmed for 3:00 PM with the listing agent meeting you at the gate.",
        address: "456 Oak Avenue",
        locality: "Beverly Hills",
        photo: propertyImage(0),
        price: 3_200_000,
        minutesAgo: 1_490,
        channel: "sms",
        read: true,
    },
    {
        id: "brentwood-drop",
        listingId: "9",
        type: "PRICE_DROP",
        description:
            "A quiet $150,000 trim on the mews house, its second reduction this quarter.",
        address: "64 Brentwood Mews",
        locality: "Brentwood",
        photo: propertyImage(8),
        price: 4_950_000,
        previousPrice: 5_100_000,
        minutesAgo: 1_205,
        channel: "inApp",
        read: true,
    },
    {
        id: "palm-drive-offer",
        listingId: "5",
        type: "UNDER_OFFER",
        description:
            "The Malibu house you saved has gone under offer and is no longer taking viewings.",
        address: "567 Palm Drive",
        locality: "Malibu",
        photo: propertyImage(4),
        price: 5_600_000,
        minutesAgo: 2_880,
        channel: "inApp",
        read: true,
    },
    {
        id: "hillcrest-status",
        listingId: "6",
        type: "STATUS_CHANGE",
        description:
            "The Hillcrest listing expired and has been withdrawn from the market by its agent.",
        address: "77 Hillcrest Terrace",
        locality: "Pasadena",
        photo: propertyImage(5),
        price: 1_850_000,
        minutesAgo: 4_320,
        channel: "email",
        read: true,
    },
];

export const priceDelta = (alert: Alert) =>
    alert.previousPrice === undefined
        ? undefined
        : alert.price - alert.previousPrice;

export const movePercent = (alert: Alert) => {
    const delta = priceDelta(alert);
    if (delta === undefined || alert.previousPrice === undefined)
        return undefined;
    return Math.round((delta / alert.previousPrice) * 100);
};

export const recencyBandOf = (alert: Alert): RecencyBand =>
    RECENCY_BAND_KEYS.find(
        (id) => alert.minutesAgo < RECENCY_BANDS[id].ceiling,
    ) ?? "earlier";

export const unreadCount = (alerts: Alert[]) =>
    alerts.filter((alert) => !alert.read).length;

export const moved = (alerts: Alert[]) =>
    alerts.filter((alert) => priceDelta(alert) !== undefined);

export const valueMoved = (alerts: Alert[]) =>
    sum(moved(alerts).map((alert) => Math.abs(priceDelta(alert) ?? 0)));

export const trackedProperties = (alerts: Alert[]) =>
    new Set(alerts.map((alert) => alert.listingId)).size;

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
            Math.abs(priceDelta(b) ?? 0) - Math.abs(priceDelta(a) ?? 0) ||
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
        id: "moves",
        icon: TrendingDown,
        label: "Price moves",
        value: `${moved(alerts).length}`,
        tone: "info",
    },
    {
        id: "value",
        icon: Wallet,
        label: "Value moved",
        value: formatCompactUsd(valueMoved(alerts)),
        tone: "highlight",
    },
    {
        id: "tracked",
        icon: Home,
        label: "Properties",
        value: `${trackedProperties(alerts)}`,
        tone: "warning",
    },
];

export const typeShares = (alerts: Alert[]): ShareDatum[] =>
    ALERT_TYPE_KEYS.map((id) => {
        const count = alerts.filter((alert) => alert.type === id).length;
        return {
            id,
            icon: ALERT_TYPES[id].icon,
            label: ALERT_TYPES[id].label,
            value: `${count}`,
            percent: percentOf(count, alerts.length),
            tone: ALERT_TYPES[id].chartTone,
        };
    });

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
    `${unreadCount(alerts)} unread · ${formatCompactUsd(valueMoved(alerts))} in price moves`;

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
