import {
    Plane,
    Castle,
    Sparkles,
    Banknote,
    type LucideIcon,
} from "lucide-react";
import type { BadgeTone } from "@/components/features/shared/contact-row";
import type { Step } from "@/components/ui/step-list";

export type ConciergeTier = "platinum" | "premium" | "vip";

export interface ConciergeService {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface VIPClient {
    id: string;
    name: string;
    tier: ConciergeTier;
    budget: number;
    deals: number;
    status: string;
    lastContact: string;
    nextAction: string;
}

export const conciergeServices: ConciergeService[] = [
    {
        icon: Plane,
        title: "International Relocation",
        description: "Luxury property search worldwide",
    },
    {
        icon: Castle,
        title: "Estate Services",
        description: "Multi-property portfolio management",
    },
    {
        icon: Sparkles,
        title: "Concierge Support",
        description: "24/7 white-glove service",
    },
    {
        icon: Banknote,
        title: "Investment Advisory",
        description: "Real estate investment strategy",
    },
];

export const vipClients: VIPClient[] = [
    {
        id: "1",
        name: "Robert Astor",
        tier: "platinum",
        budget: 50000000,
        deals: 3,
        status: "Active buyer",
        lastContact: "Today at 9:00 AM",
        nextAction: "Portfolio review tomorrow",
    },
    {
        id: "2",
        name: "Sophia Laurent",
        tier: "platinum",
        budget: 35000000,
        deals: 2,
        status: "Looking to sell",
        lastContact: "Yesterday",
        nextAction: "Schedule property appraisal",
    },
    {
        id: "3",
        name: "Marcus Sterling",
        tier: "premium",
        budget: 15000000,
        deals: 1,
        status: "Under contract",
        lastContact: "2 days ago",
        nextAction: "Closing coordination",
    },
];

export const tierMeta: Record<
    ConciergeTier,
    { tone: BadgeTone; label: string }
> = {
    platinum: { tone: "info", label: "Platinum" },
    premium: { tone: "neutral", label: "Premium" },
    vip: { tone: "success", label: "VIP" },
};

export const conciergeTips: Step[] = [
    {
        title: "Monthly check-ins",
        description:
            "Schedule monthly check-ins with Platinum clients to discuss market trends and opportunities.",
    },
    {
        title: "Exclusive access",
        description:
            "Provide exclusive access to off-market and pocket listings.",
    },
    {
        title: "White-glove services",
        description:
            "Arrange home staging, photography, and design consultation.",
    },
    {
        title: "Coordinate specialists",
        description:
            "Loop in contractors, architects, and interior designers for client needs.",
    },
];
