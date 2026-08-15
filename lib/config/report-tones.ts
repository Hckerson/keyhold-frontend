import {
    ArrowLeftRight,
    Home,
    Percent,
    Users,
    Wallet,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { ReportSignalId } from "@/lib/types";

export interface ReportSignalMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const REPORT_SIGNAL_META: Record<ReportSignalId, ReportSignalMeta> = {
    listings: { label: "Active listings", icon: Home, tone: "info" },
    transaction: {
        label: "Avg transaction",
        icon: ArrowLeftRight,
        tone: "highlight",
    },
    audience: { label: "Active users", icon: Users, tone: "accent" },
    revenue: { label: "Commissions", icon: Wallet, tone: "success" },
    velocity: { label: "Deals 30d", icon: Percent, tone: "warning" },
};

const PODIUM_RANK = 3;

export const rankTone = (rank: number): ChartTone => {
    if (rank === 1) return "highlight";
    return rank <= PODIUM_RANK ? "accent" : "neutral";
};
