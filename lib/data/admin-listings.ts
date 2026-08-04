import {
    CheckCircle2,
    AlertTriangle,
    XCircle,
    type LucideIcon,
} from "lucide-react";
import type { BadgeTone } from "@/lib/types";

export type ModerationStatus = "pending" | "flagged" | "approved" | "rejected";
export type CheckState = "pass" | "warn" | "fail";
export type ModerationFilterKey = "all" | ModerationStatus;
export type DecisionMode = "reject" | "changes";

export interface ComplianceCheck {
    label: string;
    state: CheckState;
}

export interface ModerationAgent {
    name: string;
    email: string;
    phone: string;
}

export interface ModerationListing {
    id: string;
    address: string;
    agent: ModerationAgent;
    price: number;
    status: ModerationStatus;
    submittedDate: string;
    description: string;
    images: string[];
    compliance: ComplianceCheck[];
    reason?: string;
    note?: string;
    changesRequested?: boolean;
}

export interface Decision {
    mode: DecisionMode;
    ids: string[];
}

export const INITIAL_LISTINGS: ModerationListing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        agent: {
            name: "Sarah Chen",
            email: "sarah@luxuryrealestate.com",
            phone: "(310) 555-0142",
        },
        price: 3200000,
        status: "approved",
        submittedDate: "2024-07-10",
        description:
            "Contemporary six-bedroom estate on a gated half-acre lot. Floor-to-ceiling glass opens to a level lawn, 60-foot pool and outdoor kitchen. Chef's kitchen with dual islands, primary suite with dual baths and a 900-bottle wine room.",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "pass" },
            { label: "Description accuracy", state: "pass" },
            { label: "License on file", state: "pass" },
            { label: "Fair housing language", state: "pass" },
        ],
    },
    {
        id: "2",
        address: "789 Sunset Blvd, West Hollywood, CA",
        agent: {
            name: "Michael Rodriguez",
            email: "michael@sunsetproperties.com",
            phone: "(323) 555-0178",
        },
        price: 2950000,
        status: "flagged",
        submittedDate: "2024-07-12",
        reason: "Automated scan detected an unlicensed stock photo in position 2 and unverifiable square footage in the description.",
        description:
            "Rare Sunset Strip penthouse with 180-degree city views. Over 4,800 square feet of entertaining space, private elevator access and a rooftop deck. Building amenities include valet, concierge and a residents' screening room.",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "fail" },
            { label: "Description accuracy", state: "warn" },
            { label: "License on file", state: "pass" },
            { label: "Fair housing language", state: "pass" },
        ],
    },
    {
        id: "3",
        address: "234 Oak Street, Bel Air, CA",
        agent: {
            name: "Jennifer Martinez",
            email: "jennifer@belairgroup.com",
            phone: "(310) 555-0190",
        },
        price: 4500000,
        status: "pending",
        submittedDate: "2024-07-13",
        description:
            "Mediterranean villa behind private gates with mature olive trees and a motor court. Seven bedrooms, a two-story library, screening room and a guest house. Fully renovated in 2022 with new systems throughout.",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "pass" },
            { label: "Description accuracy", state: "pass" },
            { label: "License on file", state: "warn" },
            { label: "Fair housing language", state: "pass" },
        ],
    },
    {
        id: "4",
        address: "1120 Ocean Front Walk, Malibu, CA",
        agent: {
            name: "David Williams",
            email: "david@coastlineestates.com",
            phone: "(424) 555-0113",
        },
        price: 7850000,
        status: "pending",
        submittedDate: "2024-07-14",
        description:
            "Beachfront modern on 60 feet of private sand. Walls of glass frame the water from every principal room. Four bedrooms, a spa-level primary bath and a rooftop lounge with a fire pit.",
        images: [
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "pass" },
            { label: "Description accuracy", state: "warn" },
            { label: "License on file", state: "pass" },
            { label: "Fair housing language", state: "warn" },
        ],
    },
    {
        id: "5",
        address: "88 Rodeo Drive, Beverly Hills, CA",
        agent: {
            name: "Marcus Sterling",
            email: "marcus@sterlingluxe.com",
            phone: "(310) 555-0166",
        },
        price: 5400000,
        status: "rejected",
        submittedDate: "2024-07-02",
        note: "Interior photographs belong to a different property and the listing repeats claims that cannot be verified against county records.",
        description:
            "Trophy address steps from the flagship boutiques. Five bedrooms across three levels, private motor court and a subterranean garage for six cars.",
        images: [
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "fail" },
            { label: "Description accuracy", state: "fail" },
            { label: "License on file", state: "pass" },
            { label: "Fair housing language", state: "pass" },
        ],
    },
];

export const statusMeta: Record<
    ModerationStatus,
    { tone: BadgeTone; label: string; rank: number; rowTone?: string }
> = {
    flagged: {
        tone: "error",
        label: "Flagged",
        rank: 0,
        rowTone: "bg-error/[0.035]",
    },
    pending: { tone: "warning", label: "Pending", rank: 1 },
    approved: { tone: "success", label: "Approved", rank: 2 },
    rejected: { tone: "neutral", label: "Rejected", rank: 3 },
};

export const checkMeta: Record<
    CheckState,
    {
        icon: LucideIcon;
        cls: string;
        tone: BadgeTone;
        noun: string;
        weight: number;
    }
> = {
    pass: {
        icon: CheckCircle2,
        cls: "text-success",
        tone: "success",
        noun: "checks passed",
        weight: 0,
    },
    warn: {
        icon: AlertTriangle,
        cls: "text-warning",
        tone: "warning",
        noun: "checks with warnings",
        weight: 1,
    },
    fail: {
        icon: XCircle,
        cls: "text-error",
        tone: "error",
        noun: "checks failed",
        weight: 10,
    },
};

export const MODERATION_FILTERS: { id: ModerationFilterKey; label: string }[] =
    [
        { id: "all", label: "All" },
        { id: "pending", label: "Pending" },
        { id: "flagged", label: "Flagged" },
        { id: "approved", label: "Approved" },
        { id: "rejected", label: "Rejected" },
    ];

export const DECISION_COPY: Record<
    DecisionMode,
    { title: string; label: string; placeholder: string; submit: string }
> = {
    reject: {
        title: "Reject listing",
        label: "Reason for rejection",
        placeholder:
            "Explain what fails review. This reason is stored with the listing and sent to the agent.",
        submit: "Reject listing",
    },
    changes: {
        title: "Request changes",
        label: "Feedback for the agent",
        placeholder:
            "Describe exactly what the agent must change before this listing can be approved.",
        submit: "Send feedback",
    },
};
