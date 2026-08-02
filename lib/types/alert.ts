export type AlertType =
    | "price-drop"
    | "new-listing"
    | "under-offer"
    | "status-change"
    | "offer-response"
    | "viewing-confirmation";

export interface Alert {
    id: string;
    listingId: string;
    type: AlertType;
    title: string;
    description: string;
    address: string;
    price?: number;
    previousPrice?: number;
    timestamp: string;
    read: boolean;
}
