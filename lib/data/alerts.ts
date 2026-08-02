import type { Alert } from "@/lib/types";

export type ChannelKey = "email" | "sms" | "inApp";

export type PreferenceKey =
    | "price-drops"
    | "new-listings"
    | "offer-responses"
    | "viewing-confirmations";

export interface AlertPreference {
    enabled: boolean;
    channels: Record<ChannelKey, boolean>;
}

export interface AlertPreferenceCopy {
    key: PreferenceKey;
    title: string;
    description: string;
}

export const channels: { key: ChannelKey; label: string }[] = [
    { key: "email", label: "Email" },
    { key: "sms", label: "SMS" },
    { key: "inApp", label: "In-app" },
];

export const preferenceCopy: AlertPreferenceCopy[] = [
    {
        key: "price-drops",
        title: "Price Drops",
        description:
            "Saved listings that drop by at least your chosen threshold",
    },
    {
        key: "new-listings",
        title: "New Listings",
        description: "New properties matching your saved search criteria",
    },
    {
        key: "offer-responses",
        title: "Offer Responses",
        description: "Seller accepts, counters or rejects one of your offers",
    },
    {
        key: "viewing-confirmations",
        title: "Viewing Confirmations",
        description: "An agent confirms, reschedules or cancels a viewing",
    },
];

export const initialPreferences: Record<PreferenceKey, AlertPreference> = {
    "price-drops": {
        enabled: true,
        channels: { email: true, sms: false, inApp: true },
    },
    "new-listings": {
        enabled: true,
        channels: { email: true, sms: false, inApp: true },
    },
    "offer-responses": {
        enabled: true,
        channels: { email: true, sms: true, inApp: true },
    },
    "viewing-confirmations": {
        enabled: true,
        channels: { email: false, sms: true, inApp: true },
    },
};

export const initialAlerts: Alert[] = [
    {
        id: "1",
        listingId: "1",
        type: "price-drop",
        title: "Price Reduction",
        description: "The price has been reduced by $150,000",
        address: "456 Oak Avenue, Beverly Hills, CA",
        price: 3200000,
        previousPrice: 3350000,
        timestamp: "2 hours ago",
        read: false,
    },
    {
        id: "2",
        listingId: "2",
        type: "new-listing",
        title: "New Listing Match",
        description: "A new property matching your criteria just listed",
        address: "678 Elm Street, Bel Air, CA",
        price: 3800000,
        timestamp: "5 hours ago",
        read: false,
    },
    {
        id: "3",
        listingId: "3",
        type: "offer-response",
        title: "Counter Offer Received",
        description: "The seller countered your offer at $4,400,000",
        address: "234 Oak Street, Bel Air, CA",
        timestamp: "yesterday",
        read: false,
    },
    {
        id: "4",
        listingId: "4",
        type: "viewing-confirmation",
        title: "Viewing Confirmed",
        description: "Your tour on Jul 28 at 3:00 PM is confirmed",
        address: "456 Oak Avenue, Beverly Hills, CA",
        timestamp: "1 day ago",
        read: true,
    },
    {
        id: "5",
        listingId: "5",
        type: "under-offer",
        title: "Status Update",
        description: "This property is now under offer",
        address: "567 Palm Drive, Malibu, CA",
        timestamp: "2 days ago",
        read: true,
    },
];
