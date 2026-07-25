import { Home, Building2, type LucideIcon } from "lucide-react";
import { propertyImage } from "@/lib/config/sample-images";

export type JoinRole = "BUYER" | "SELLER";

export interface JoinRoleOption {
    value: JoinRole;
    label: string;
    headline: string;
    blurb: string;
    points: string[];
    icon: LucideIcon;
    portal: string;
    image: string;
}

export const JOIN_ROLES: readonly JoinRoleOption[] = [
    {
        value: "BUYER",
        label: "Buyer",
        headline: "I'm looking for a residence",
        blurb: "A private brief, a curated shortlist, and access to off-market estates before they surface.",
        points: [
            "Off-market listings",
            "Saved searches & alerts",
            "Private viewings on request",
        ],
        icon: Home,
        portal: "/dashboard",
        image: propertyImage(2),
    },
    {
        value: "SELLER",
        label: "Seller / Agent",
        headline: "I'm listing a property",
        blurb: "Present a residence to a vetted audience, with discretion.",
        points: [],
        icon: Building2,
        portal: "/agent",
        image: propertyImage(5),
    },
];
