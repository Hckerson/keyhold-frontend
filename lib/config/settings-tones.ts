import {
    DatabaseZap,
    Flag,
    KeyRound,
    Power,
    Server,
    ShieldCheck,
    Wallet,
    type LucideIcon,
} from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { ChartTone } from "@/lib/config/chart-tones";
import type {
    MaintenanceRisk,
    PolicyDomain,
    PolicyEnforcement,
} from "@/lib/types";

export interface PolicyDomainMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const POLICY_DOMAINS: Record<PolicyDomain, PolicyDomainMeta> = {
    moderation: { label: "Moderation", icon: Flag, tone: "warning" },
    access: { label: "Access", icon: ShieldCheck, tone: "accent" },
    payout: { label: "Payouts", icon: Wallet, tone: "info" },
    availability: { label: "Availability", icon: Power, tone: "highlight" },
    platform: { label: "Platform", icon: Server, tone: "neutral" },
};

export interface PolicyEnforcementMeta {
    label: string;
    tone: DotTone;
    chartTone: ChartTone;
}

export const POLICY_ENFORCEMENTS: Record<
    PolicyEnforcement,
    PolicyEnforcementMeta
> = {
    blocking: { label: "Blocking", tone: "error", chartTone: "error" },
    advisory: { label: "Advisory", tone: "info", chartTone: "info" },
};

export const POLICY_OFF_LABEL = "Off";

export interface MaintenanceRiskMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    danger: boolean;
}

export const MAINTENANCE_RISKS: Record<MaintenanceRisk, MaintenanceRiskMeta> = {
    routine: {
        label: "Routine",
        icon: DatabaseZap,
        tone: "info",
        danger: false,
    },
    elevated: {
        label: "Elevated",
        icon: KeyRound,
        tone: "warning",
        danger: false,
    },
    destructive: {
        label: "Destructive",
        icon: DatabaseZap,
        tone: "error",
        danger: true,
    },
};

const REACH_CEILINGS: { ceiling: number; tone: ChartTone }[] = [
    { ceiling: 25, tone: "info" },
    { ceiling: 75, tone: "accent" },
];

export const reachTone = (percent: number): ChartTone =>
    REACH_CEILINGS.find((band) => percent < band.ceiling)?.tone ?? "highlight";

export const KEY_ROTATION_SLA_MINUTES = 129_600;

export const keyAgeTone = (minutes: number): ChartTone => {
    if (minutes < KEY_ROTATION_SLA_MINUTES / 2) return "success";
    return minutes < KEY_ROTATION_SLA_MINUTES ? "warning" : "error";
};
