import { CalendarDays, FileText, Heart, KeyRound } from "lucide-react";
import type { BuyerJourney } from "@/lib/types";

export const buyerJourney: BuyerJourney = {
    label: "Journey",
    stations: [
        {
            label: "Saved",
            href: "/dashboard/saved",
            icon: Heart,
            description: "Properties you've bookmarked",
            state: "complete",
            count: 8,
        },
        {
            label: "Viewings",
            href: "/dashboard/viewings",
            icon: CalendarDays,
            description: "Upcoming property tours",
            state: "complete",
            count: 3,
        },
        {
            label: "Offers",
            href: "/dashboard/offers",
            icon: FileText,
            description: "Track your submitted offers",
            state: "active",
            count: 2,
        },
        {
            label: "Closing",
            icon: KeyRound,
            description: "Escrow, title and handover",
            state: "pending",
        },
    ],
    status: {
        title: "Offer review",
        detail: "Sarah Chen · Tue 14:00",
    },
};
