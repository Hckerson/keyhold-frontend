import type { LucideIcon } from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { StatusTone } from "./ui";

export type InputVariant = "text" | "numeric" | "code";
export type SwitchSize = "sm" | "md";

export interface StatDatum {
    id: string;
    icon: LucideIcon;
    label: string;
    value: string;
    tone: ChartTone;
    href?: string;
}

export interface ShareDatum {
    id: string;
    icon: LucideIcon;
    label: string;
    value: string;
    percent: number;
    tone: ChartTone;
}

export interface Signal {
    label: string;
    value: string;
}

export interface Step {
    title: string;
    description?: string;
}

export interface FilterPill<T extends string> {
    id: T;
    label: string;
}

export interface Choice<T extends string> {
    id: T;
    label: string;
    caption?: string;
}

export interface SelectOption<T extends string> {
    value: T;
    label: string;
}

export interface ConfigField<K extends string> {
    name: K;
    label: string;
    placeholder: string;
    type?: string;
    prefix?: string;
    suffix?: string;
    variant?: InputVariant;
    hint?: string;
    options?: readonly SelectOption<string>[];
}

export interface ConfirmNotice {
    title: string;
    body?: string;
}

export interface PortalHeaderBack {
    label: string;
    href: string;
}

export interface CalloutNote {
    variant?: StatusTone;
    title: string;
    description?: string;
}
