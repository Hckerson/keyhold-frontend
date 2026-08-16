import { BadgeCheck, BellRing, Radio, UserCheck, Wallet } from "lucide-react";
import type { ConfigField } from "@/components/patterns/config-field-grid";
import type { StatDatum } from "@/components/patterns/stat-cell";
import { strengthTone } from "@/lib/config/account-tones";
import {
    ALERT_TYPE_COUNT,
    alertDeliveryCount,
    enabledAlertCount,
} from "@/lib/data/alerts";
import {
    DOCUMENT_COUNT,
    SEARCH_PROFILE_STRENGTH,
    verifiedDocumentCount,
} from "@/lib/data/buyer-account";
import type { AlertPreference, AlertType } from "@/lib/types";
import { formatCompactUsd, formatCount } from "@/lib/utils";

export type ContactMethod = "email" | "sms" | "phone" | "in-app";

export const DASHBOARD_SETTINGS_FORM_ID = "dashboard-settings-form";
export const DATA_EXPORT_FILENAME = "account-data.json";
export const DELETE_CONFIRMATION = "DELETE";
export const MIN_PASSWORD_LENGTH = 8;
export const TWO_FACTOR_CODE_LENGTH = 6;

export const PROFILE_UPDATED = {
    actor: "John Doe",
    ageMinutes: 2_880,
};

export const CONTACT_METHODS: { value: ContactMethod; label: string }[] = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "phone", label: "Phone" },
    { value: "in-app", label: "In-app" },
];

export const INITIAL_CONTACT_METHOD: ContactMethod = "email";

export const EMPTY_PASSWORD = { current: "", next: "", confirm: "" };
export type PasswordForm = typeof EMPTY_PASSWORD;

export const INITIAL_PROFILE = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "(310) 555-0123",
    preferredLocation: "Beverly Hills, CA",
    budgetMin: "2500000",
    budgetMax: "5000000",
};
export type ProfileForm = typeof INITIAL_PROFILE;

export const changedFieldCount = (current: ProfileForm) => {
    const initial: Record<string, string> = INITIAL_PROFILE;
    return Object.entries(current).filter(
        ([key, value]) => initial[key] !== value,
    ).length;
};

export const budgetRange = (form: ProfileForm) =>
    `${formatCompactUsd(Number(form.budgetMin) || 0)} – ${formatCompactUsd(Number(form.budgetMax) || 0)}`;

export const PROFILE_FIELDS: readonly ConfigField<keyof ProfileForm>[] = [
    { name: "fullName", label: "Full Name", placeholder: "John Doe" },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "john@example.com",
    },
    {
        name: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "(310) 555-0123",
        variant: "numeric",
    },
    {
        name: "preferredLocation",
        label: "Preferred Location",
        placeholder: "Beverly Hills, CA",
    },
];

export const BUDGET_FIELDS: readonly ConfigField<keyof ProfileForm>[] = [
    {
        name: "budgetMin",
        label: "Minimum Budget",
        placeholder: "2,500,000",
        prefix: "$",
        variant: "numeric",
    },
    {
        name: "budgetMax",
        label: "Maximum Budget",
        placeholder: "5,000,000",
        prefix: "$",
        variant: "numeric",
    },
];

export const buildDashboardSettingsStats = (
    form: ProfileForm,
    preferences: Record<AlertType, AlertPreference>,
): StatDatum[] => [
    {
        id: "strength",
        icon: UserCheck,
        label: "Search profile",
        value: `${SEARCH_PROFILE_STRENGTH}%`,
        tone: strengthTone(SEARCH_PROFILE_STRENGTH),
    },
    {
        id: "ceiling",
        icon: Wallet,
        label: "Budget ceiling",
        value: formatCompactUsd(Number(form.budgetMax) || 0),
        tone: "highlight",
    },
    {
        id: "alerts",
        icon: BellRing,
        label: "Signals on",
        value: `${enabledAlertCount(preferences)}/${ALERT_TYPE_COUNT}`,
        tone: "accent",
    },
    {
        id: "deliveries",
        icon: Radio,
        label: "Deliveries",
        value: formatCount(alertDeliveryCount(preferences)),
        tone: "info",
    },
    {
        id: "documents",
        icon: BadgeCheck,
        label: "Documents",
        value: `${verifiedDocumentCount}/${DOCUMENT_COUNT}`,
        tone: verifiedDocumentCount === DOCUMENT_COUNT ? "success" : "warning",
    },
];
