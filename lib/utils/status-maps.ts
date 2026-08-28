import type {
    ConnectionStatus as ApiConnectionStatus,
    ConciergeStatus as ApiConciergeStatus,
    ConciergeTier as ApiConciergeTier,
    OfferStatus as ApiOfferStatus,
    ViewingMode as ApiViewingMode,
    ViewingStatus as ApiViewingStatus,
} from "@/lib/enums/enums";
import type {
    ConciergeStatus,
    ConciergeTier,
} from "@/lib/config/concierge-tones";
import type { InterestStatus } from "@/lib/types/interest";
import type { OfferStatus } from "@/lib/types/offer";
import type { ViewingMode, ViewingStatus } from "@/lib/types/viewing";

export const CONNECTION_STATUS_BY_API: Record<
    ApiConnectionStatus,
    InterestStatus
> = {
    PENDING: "pending",
    ACCEPTED: "connected",
    REJECTED: "declined",
};

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

export const VIEWING_MODE_BY_API: Record<ApiViewingMode, ViewingMode> = {
    IN_PERSON: "in-person",
    VIRTUAL: "virtual",
    OPEN_HOUSE: "open-house",
};

export const API_VIEWING_MODE: Record<ViewingMode, ApiViewingMode> = {
    "in-person": "IN_PERSON",
    virtual: "VIRTUAL",
    "open-house": "OPEN_HOUSE",
};

export const CONCIERGE_TIER_BY_API: Record<ApiConciergeTier, ConciergeTier> = {
    PLATINUM: "platinum",
    VIP: "vip",
    PREMIUM: "premium",
};

export const CONCIERGE_STATUS_BY_API: Record<
    ApiConciergeStatus,
    ConciergeStatus
> = {
    ACQUIRING: "acquiring",
    UNDER_CONTRACT: "under-contract",
    DIVESTING: "divesting",
    DORMANT: "dormant",
};
