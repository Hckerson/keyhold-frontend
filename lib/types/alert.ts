import type { NotificationType } from "@/lib/enums/enums";

export type AlertType = NotificationType;

export type AlertChannel = "email" | "sms" | "inApp";

export interface Alert {
    id: string;
    listingId: string | null;
    type: AlertType;
    description: string;
    address: string;
    locality: string;
    photo: string | null;
    price: number | null;
    minutesAgo: number;
    channel: AlertChannel;
    read: boolean;
}

export interface AlertPreference {
    enabled: boolean;
    channels: Record<AlertChannel, boolean>;
}
