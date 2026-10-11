export const PROPERTY_TYPES = [
    "ESTATE",
    "VILLA",
    "PENTHOUSE",
    "HOUSE",
    "APARTMENT",
    "CONDO",
    "TOWNHOUSE",
    "LAND",
    "OTHER",
] as const;

export const PROPERTY_STATUSES = [
    "DRAFT",
    "AVAILABLE",
    "PENDING",
    "SOLD",
    "EXPIRED",
] as const;

export const PROPERTY_SORTS = [
    "newest",
    "price-asc",
    "price-desc",
    "bedrooms-desc",
    "sqft-desc",
    "popular",
    "recently-sold",
    "featured",
] as const;

export const CONNECTION_STATUSES = ["PENDING", "ACCEPTED", "REJECTED"] as const;

export const CONTACT_CHANNELS = ["EMAIL", "SMS", "CALL"] as const;

export const CONTACT_DIRECTIONS = ["OUTBOUND", "INBOUND"] as const;

export const CONTACT_STATUSES = [
    "QUEUED",
    "SENT",
    "RINGING",
    "COMPLETED",
    "NO_ANSWER",
    "FAILED",
] as const;

export const VIEWING_MODES = ["IN_PERSON", "VIRTUAL", "OPEN_HOUSE"] as const;

export const VIEWING_STATUSES = [
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
] as const;

export const OFFER_STATUSES = [
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "COUNTERED",
    "EXPIRED",
] as const;

export const TRANSACTION_STATUSES = [
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
] as const;

export const TIME_FILTERS = ["day", "month", "year"] as const;

export const USER_ROLES = ["ADMIN", "BUYER", "SELLER"] as const;

export const USER_ACCOUNT_STATUSES = [
    "ACTIVE",
    "PENDING",
    "SUSPENDED",
    "DELETED",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];
export type PropertySort = (typeof PROPERTY_SORTS)[number];
export type ConnectionStatus = (typeof CONNECTION_STATUSES)[number];
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];
export type ContactDirection = (typeof CONTACT_DIRECTIONS)[number];
export type ContactStatus = (typeof CONTACT_STATUSES)[number];
export type ViewingStatus = (typeof VIEWING_STATUSES)[number];
export type ViewingMode = (typeof VIEWING_MODES)[number];
export type OfferStatus = (typeof OFFER_STATUSES)[number];
export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number];
export type TimeFilter = (typeof TIME_FILTERS)[number];
export type UserRole = (typeof USER_ROLES)[number];
export type UserAccountStatus = (typeof USER_ACCOUNT_STATUSES)[number];

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
    ESTATE: "Estate",
    VILLA: "Villa",
    PENTHOUSE: "Penthouse",
    HOUSE: "House",
    APARTMENT: "Apartment",
    CONDO: "Condo",
    TOWNHOUSE: "Townhouse",
    LAND: "Land",
    OTHER: "Other",
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
    DRAFT: "Draft",
    AVAILABLE: "For Sale",
    PENDING: "Under Offer",
    SOLD: "Sold",
    EXPIRED: "Expired",
};

export const CONNECTION_STATUS_LABELS: Record<ConnectionStatus, string> = {
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    REJECTED: "Declined",
};

export const VIEWING_STATUS_LABELS: Record<ViewingStatus, string> = {
    PENDING: "Awaiting confirmation",
    CONFIRMED: "Confirmed",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export const OFFER_STATUS_LABELS: Record<OfferStatus, string> = {
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    REJECTED: "Declined",
    COUNTERED: "Countered",
    EXPIRED: "Expired",
};

export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
    PENDING: "Pending",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export const PROPERTY_SORT_LABELS: Record<PropertySort, string> = {
    newest: "Newest first",
    "price-asc": "Price: low to high",
    "price-desc": "Price: high to low",
    "bedrooms-desc": "Most bedrooms",
    "sqft-desc": "Largest first",
    popular: "Most viewed",
    "recently-sold": "Recently sold",
    featured: "Featured first",
};

export const FLAG_TYPES = ["USER", "PROPERTY", "MESSAGE"] as const;

export const FLAG_STATUSES = ["ACTIVE", "RESOLVED", "DISMISSED"] as const;

export const VERIFICATION_STATUSES = [
    "PENDING",
    "VERIFIED",
    "REJECTED",
] as const;

export const DISPUTE_STATUSES = [
    "OPEN",
    "PENDING_REVIEW",
    "RESOLVED",
    "DISMISSED",
] as const;

export const DISPUTE_EVIDENCE_TYPES = ["MESSAGE", "PHOTO", "DOCUMENT"] as const;

export const ESCROW_STATUSES = [
    "HELD",
    "RELEASED",
    "REFUNDED",
    "DISPUTED",
] as const;

export const CONTINGENCIES = ["INSPECTION", "APPRAISAL", "FINANCING"] as const;

export const MILESTONE_KINDS = [
    "INSPECTION",
    "APPRAISAL",
    "FINANCING",
    "CLOSING",
] as const;

export const MILESTONE_STATUSES = [
    "PENDING",
    "SCHEDULED",
    "COMPLETED",
    "WAIVED",
] as const;

export const NOTIFICATION_TYPES = [
    "PRICE_DROP",
    "NEW_LISTING",
    "UNDER_OFFER",
    "STATUS_CHANGE",
    "OFFER_RESPONSE",
    "VIEWING_CONFIRMATION",
    "MESSAGE_RECEIVED",
    "CONNECTION_REQUEST",
] as const;

export const NOTIFICATION_CHANNELS = ["EMAIL", "SMS", "IN_APP"] as const;

export const SETTING_CATEGORIES = [
    "PLATFORM",
    "COMMERCE",
    "MODERATION",
    "AVAILABILITY",
] as const;

export const AUDIT_ACTION_TYPES = [
    "USER_CREATED",
    "USER_UPDATED",
    "USER_DELETED",
    "USER_SUSPENDED",
    "PROPERTY_CREATED",
    "PROPERTY_UPDATED",
    "PROPERTY_DELETED",
    "PROPERTY_FLAGGED",
    "TRANSACTION_CREATED",
    "TRANSACTION_UPDATED",
    "TRANSACTION_COMPLETED",
    "OFFER_CREATED",
    "OFFER_ACCEPTED",
    "DISPUTE_CREATED",
    "DISPUTE_RESOLVED",
    "LOGIN",
    "LOGOUT",
    "LOGIN_SUCCEEDED",
    "LOGIN_FAILED",
    "PERMISSION_DENIED",
    "SETTINGS_UPDATED",
] as const;

export const MODERATION_DECISIONS = ["approve", "changes", "reject"] as const;

export const DISPUTE_OUTCOMES = ["RELEASE", "REFUND"] as const;

export type FlagType = (typeof FLAG_TYPES)[number];
export type FlagStatus = (typeof FLAG_STATUSES)[number];
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];
export type DisputeStatus = (typeof DISPUTE_STATUSES)[number];
export type DisputeEvidenceType = (typeof DISPUTE_EVIDENCE_TYPES)[number];
export type EscrowStatus = (typeof ESCROW_STATUSES)[number];
export type Contingency = (typeof CONTINGENCIES)[number];
export type MilestoneKind = (typeof MILESTONE_KINDS)[number];
export type MilestoneStatus = (typeof MILESTONE_STATUSES)[number];
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];
export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];
export type SettingCategory = (typeof SETTING_CATEGORIES)[number];
export type AuditActionType = (typeof AUDIT_ACTION_TYPES)[number];
export type ModerationDecision = (typeof MODERATION_DECISIONS)[number];
export type DisputeOutcome = (typeof DISPUTE_OUTCOMES)[number];

export const FLAG_TYPE_LABELS: Record<FlagType, string> = {
    USER: "Member",
    PROPERTY: "Listing",
    MESSAGE: "Message",
};

export const FLAG_STATUS_LABELS: Record<FlagStatus, string> = {
    ACTIVE: "Open",
    RESOLVED: "Resolved",
    DISMISSED: "Dismissed",
};

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
    PENDING: "Awaiting review",
    VERIFIED: "Verified",
    REJECTED: "Rejected",
};

export const DISPUTE_STATUS_LABELS: Record<DisputeStatus, string> = {
    OPEN: "Open",
    PENDING_REVIEW: "In review",
    RESOLVED: "Resolved",
    DISMISSED: "Dismissed",
};

export const ESCROW_STATUS_LABELS: Record<EscrowStatus, string> = {
    HELD: "Held",
    RELEASED: "Released",
    REFUNDED: "Refunded",
    DISPUTED: "Disputed",
};

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
    PRICE_DROP: "Price drop",
    NEW_LISTING: "New listing",
    UNDER_OFFER: "Under offer",
    STATUS_CHANGE: "Status change",
    OFFER_RESPONSE: "Offer response",
    VIEWING_CONFIRMATION: "Viewing confirmation",
    MESSAGE_RECEIVED: "Message received",
    CONNECTION_REQUEST: "Connection request",
};

export const NOTIFICATION_CHANNEL_LABELS: Record<NotificationChannel, string> =
    {
        EMAIL: "Email",
        SMS: "SMS",
        IN_APP: "In app",
    };

export const SETTING_CATEGORY_LABELS: Record<SettingCategory, string> = {
    PLATFORM: "Platform",
    COMMERCE: "Commerce",
    MODERATION: "Moderation",
    AVAILABILITY: "Availability",
};

export const USER_TIERS = ["STANDARD", "PREMIUM", "PLATINUM"] as const;

export const CONCIERGE_TIERS = ["PREMIUM", "VIP", "PLATINUM"] as const;

export const CONCIERGE_STATUSES = [
    "ACQUIRING",
    "UNDER_CONTRACT",
    "DIVESTING",
    "DORMANT",
] as const;

export const CONCIERGE_REQUEST_STATUSES = [
    "OPEN",
    "IN_PROGRESS",
    "CLOSED",
] as const;

export const SERVICE_COMPONENTS = [
    "DATABASE",
    "API",
    "SEARCH",
    "STORAGE",
    "PAYMENTS",
] as const;

export const SERVICE_STATES = [
    "operational",
    "degraded",
    "down",
    "unknown",
] as const;

export const INTEGRATION_IDS = [
    "stripe",
    "stripeWebhook",
    "smtp",
    "cloudinary",
    "twilio",
] as const;

export type UserTier = (typeof USER_TIERS)[number];
export type ConciergeTier = (typeof CONCIERGE_TIERS)[number];
export type ConciergeStatus = (typeof CONCIERGE_STATUSES)[number];
export type ConciergeRequestStatus =
    (typeof CONCIERGE_REQUEST_STATUSES)[number];
export type ServiceComponent = (typeof SERVICE_COMPONENTS)[number];
export type ServiceState = (typeof SERVICE_STATES)[number];
export type IntegrationId = (typeof INTEGRATION_IDS)[number];
