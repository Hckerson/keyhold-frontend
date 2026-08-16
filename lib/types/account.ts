import type { LucideIcon } from "lucide-react";

export type CredentialState = "verified" | "expiring" | "missing";

export type SecurityState = "enabled" | "recommended" | "critical";

export type PrivacyScope = "profile" | "activity" | "contact";

export interface AccountCredential {
    id: string;
    label: string;
    issuer: string;
    state: CredentialState;
    expiresInMinutes: number;
}

export interface SecurityControl<K extends string = string> {
    id: K;
    label: string;
    caption: string;
    action: string;
    state: SecurityState;
    lastChangedMinutes?: number;
}

export interface PrivacyControl<K extends string = string> {
    id: K;
    icon: LucideIcon;
    label: string;
    audience: string;
    scope: PrivacyScope;
}
