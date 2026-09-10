import {
    GraduationCap,
    TrainFront,
    Trees,
    UtensilsCrossed,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { PoiKind } from "@/lib/types";

export interface PoiKindMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const POI_KIND_KEYS: PoiKind[] = [
    "school",
    "transit",
    "park",
    "restaurant",
];

export const POI_KINDS: Record<PoiKind, PoiKindMeta> = {
    school: { label: "Schools", icon: GraduationCap, tone: "info" },
    transit: { label: "Transit", icon: TrainFront, tone: "accent" },
    park: { label: "Parks", icon: Trees, tone: "success" },
    restaurant: {
        label: "Restaurants",
        icon: UtensilsCrossed,
        tone: "warning",
    },
};
