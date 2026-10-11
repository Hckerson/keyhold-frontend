import { ALERT_CHANNEL_KEYS, ALERT_TYPE_KEYS } from "@/lib/config/alert-tones";
import type { AlertChannel, AlertPreference, AlertType } from "@/lib/types";
import type { NotificationPreference } from "@/lib/validations/notification";
import { sum } from "@/lib/utils";

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
