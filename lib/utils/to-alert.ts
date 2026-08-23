import type { AlertChannel } from "@/lib/types/alert";
import type { Alert } from "@/lib/types/alert";
import type { NotificationChannel } from "@/lib/enums/enums";
import type { Notification } from "@/lib/validations/notification";
import { minutesSince } from "@/lib/utils/elapsed";

export const ALERT_CHANNEL_BY_NOTIFICATION: Record<
    NotificationChannel,
    AlertChannel
> = {
    EMAIL: "email",
    SMS: "sms",
    IN_APP: "inApp",
};

export const toAlert = (notification: Notification): Alert => ({
    id: notification.id,
    listingId: notification.property?.id ?? null,
    type: notification.type,
    description: notification.body,
    address: notification.property?.address ?? notification.title,
    locality: notification.property?.locality ?? "",
    photo: notification.property?.image ?? null,
    price: notification.property?.price ?? null,
    minutesAgo: minutesSince(notification.createdAt),
    channel: ALERT_CHANNEL_BY_NOTIFICATION[notification.channel],
    read: notification.isRead,
});
