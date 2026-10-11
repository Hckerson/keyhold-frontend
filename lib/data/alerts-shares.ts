import {
    ALERT_CHANNELS,
    ALERT_CHANNEL_KEYS,
    ALERT_TYPES,
    ALERT_TYPE_KEYS,
    RECENCY_BANDS,
    RECENCY_BAND_KEYS,
} from "@/lib/config/alert-tones";
import { recencyBandOf } from "@/lib/data/alerts";
import type { Alert, AlertType, AlertVolume, ShareDatum } from "@/lib/types";
import { percentOf } from "@/lib/utils";

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
