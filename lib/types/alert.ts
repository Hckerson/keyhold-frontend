export type AlertType =
    | "price-drop"
    | "new-listing"
    | "under-offer"
    | "status-change"
    | "offer-response"
    | "viewing-confirmation";

export type AlertChannel = "email" | "sms" | "inApp";

export interface Alert {
    id: string;
    listingId: string;
    type: AlertType;
    description: string;
    address: string;
    locality: string;
    photo: string;
    price: number;
    previousPrice?: number;
    minutesAgo: number;
    channel: AlertChannel;
    read: boolean;
}

export interface AlertPreference {
    enabled: boolean;
    channels: Record<AlertChannel, boolean>;
}
