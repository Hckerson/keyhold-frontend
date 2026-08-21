import type {
    OfferStatus as ApiOfferStatus,
    ViewingStatus as ApiViewingStatus,
} from "@/lib/enums/enums";
import type { OfferStatus } from "@/lib/types/offer";
import type { ViewingStatus } from "@/lib/types/viewing";

export const OFFER_STATUS_BY_API: Record<ApiOfferStatus, OfferStatus> = {
    PENDING: "submitted",
    COUNTERED: "countered",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    EXPIRED: "withdrawn",
};

export const VIEWING_STATUS_BY_API: Record<ApiViewingStatus, ViewingStatus> = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
};
