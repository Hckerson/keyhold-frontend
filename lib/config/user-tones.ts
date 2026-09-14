import {
    Building2,
    CheckCircle2,
    CircleSlash,
    PauseCircle,
    UserRoundX,
    ShieldCheck,
    UserRound,
    type LucideIcon,
} from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { CalloutVariant } from "@/components/ui/callout";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { ManagedUserRole, UserStatus, UserTier } from "@/lib/types";

interface ToneBand {
    ceiling: number;
    tone: ChartTone;
}

const bandTone = (bands: ToneBand[], value: number, fallback: ChartTone) =>
    bands.find((band) => value < band.ceiling)?.tone ?? fallback;

export const USER_ROLE_KEYS: ManagedUserRole[] = ["buyer", "agent", "admin"];

export interface UserRoleMeta {
    label: string;
    plural: string;
    icon: LucideIcon;
    tone: ChartTone;
    rank: number;
}

export const USER_ROLES: Record<ManagedUserRole, UserRoleMeta> = {
    buyer: {
        label: "Buyer",
        plural: "Buyers",
        icon: UserRound,
        tone: "neutral",
        rank: 1,
    },
    agent: {
        label: "Agent",
        plural: "Agents",
        icon: Building2,
        tone: "info",
        rank: 2,
    },
    admin: {
        label: "Admin",
        plural: "Admins",
        icon: ShieldCheck,
        tone: "accent",
        rank: 3,
    },
};

export const USER_TIER_KEYS: UserTier[] = ["platinum", "premium", "standard"];

export interface UserTierMeta {
    label: string;
    tone: ChartTone;
    rank: number;
}

export const USER_TIERS: Record<UserTier, UserTierMeta> = {
    platinum: { label: "Platinum", tone: "highlight", rank: 3 },
    premium: { label: "Premium", tone: "info", rank: 2 },
    standard: { label: "Standard", tone: "neutral", rank: 1 },
};

export const USER_STATUS_KEYS: UserStatus[] = [
    "active",
    "pending",
    "suspended",
    "deleted",
];

export interface UserStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    chartTone: ChartTone;
    risk: number;
    rowTone?: string;
    note?: string;
    noteTitle: string;
    noteTone: CalloutVariant;
}

export const USER_STATUSES: Record<UserStatus, UserStatusMeta> = {
    active: {
        label: "Active",
        icon: CheckCircle2,
        tone: "success",
        chartTone: "success",
        risk: 0,
        noteTitle: "Account note",
        noteTone: "success",
    },
    pending: {
        label: "Pending",
        icon: PauseCircle,
        tone: "neutral",
        chartTone: "warning",
        risk: 1,
        note: "This account has not completed verification. It keeps every permission until it is suspended.",
        noteTitle: "Pending account",
        noteTone: "warning",
    },
    suspended: {
        label: "Suspended",
        icon: CircleSlash,
        tone: "error",
        chartTone: "error",
        risk: 2,
        rowTone: "bg-error/[0.035]",
        note: "This account cannot list, bid or transact until it is reactivated.",
        noteTitle: "Why this account is suspended",
        noteTone: "error",
    },
    deleted: {
        label: "Deleted",
        icon: UserRoundX,
        tone: "neutral",
        chartTone: "neutral",
        risk: 3,
        note: "This account has been deleted. It is retained for audit only and cannot be reactivated.",
        noteTitle: "Why this account is deleted",
        noteTone: "neutral",
    },
};

const RECENCY_BANDS: ToneBand[] = [
    { ceiling: 8, tone: "success" },
    { ceiling: 31, tone: "info" },
    { ceiling: 91, tone: "warning" },
];

const VOLUME_BANDS: ToneBand[] = [
    { ceiling: 25, tone: "neutral" },
    { ceiling: 60, tone: "accent" },
];

export const recencyTone = (days: number) =>
    bandTone(RECENCY_BANDS, days, "error");

export const volumeTone = (share: number) =>
    bandTone(VOLUME_BANDS, share, "highlight");
