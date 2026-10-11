import {
    Ban,
    CalendarCheck,
    FileSignature,
    Handshake,
    Hourglass,
    KeyRound,
    Search,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import type { PropertyStage, StageAction, StatusTone } from "@/lib/types";

export const PROPERTY_STAGE_KEYS: PropertyStage[] = [
    "browsing",
    "requested",
    "declined",
    "connected",
    "viewing",
    "offered",
    "countered",
    "closing",
    "owned",
];

export interface PropertyStageMeta {
    label: string;
    note: string;
    icon: LucideIcon;
    tone: StatusTone;
    primary: StageAction;
    secondary: StageAction | null;
}

const AWAIT_ACTION: StageAction = { kind: "none", label: "Awaiting a reply" };

export const PROPERTY_STAGES: Record<PropertyStage, PropertyStageMeta> = {
    browsing: {
        label: "Not yet introduced",
        note: "Register your interest to open viewings and offers on this residence.",
        icon: Search,
        tone: "neutral",
        primary: { kind: "interest", label: "Register your interest" },
        secondary: null,
    },
    requested: {
        label: "Interest sent",
        note: "The listing office is reviewing your request. Viewings and offers open once they accept.",
        icon: Hourglass,
        tone: "warning",
        primary: AWAIT_ACTION,
        secondary: null,
    },
    declined: {
        label: "Interest declined",
        note: "The listing office declined this request. Comparable residences are shown below.",
        icon: Ban,
        tone: "error",
        primary: { kind: "none", label: "Closed to enquiries" },
        secondary: null,
    },
    connected: {
        label: "Introduced",
        note: "You are connected to the listing office. Arrange a viewing or place an offer.",
        icon: Handshake,
        tone: "success",
        primary: { kind: "viewing", label: "Request a viewing" },
        secondary: { kind: "offer", label: "Make an offer" },
    },
    viewing: {
        label: "Viewing requested",
        note: "Your viewing sits with the listing office. Place an offer whenever you are ready.",
        icon: CalendarCheck,
        tone: "info",
        primary: { kind: "offer", label: "Make an offer" },
        secondary: { kind: "viewing", label: "Propose another time" },
    },
    offered: {
        label: "Offer live",
        note: "Your offer is with the seller. You will be alerted the moment they respond.",
        icon: FileSignature,
        tone: "warning",
        primary: { kind: "track", label: "Track your offer" },
        secondary: null,
    },
    countered: {
        label: "Seller countered",
        note: "The seller has answered with revised terms. Review them and respond.",
        icon: Handshake,
        tone: "info",
        primary: { kind: "track", label: "Review the counter" },
        secondary: null,
    },
    closing: {
        label: "In closing",
        note: "Funds are moving through escrow. Follow the handover from your portal.",
        icon: ShieldCheck,
        tone: "info",
        primary: { kind: "track", label: "Open your closing" },
        secondary: null,
    },
    owned: {
        label: "Yours",
        note: "This residence is yours. The record of the purchase lives in your portal.",
        icon: KeyRound,
        tone: "success",
        primary: { kind: "track", label: "View the record" },
        secondary: null,
    },
};

export const GATED_STAGES: PropertyStage[] = [
    "browsing",
    "requested",
    "declined",
];

export const isGated = (stage: PropertyStage) => GATED_STAGES.includes(stage);
