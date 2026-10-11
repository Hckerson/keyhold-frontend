import { BadgeCheck, BellRing, Radio, UserCheck, Wallet } from "lucide-react";
import { strengthTone } from "@/lib/config/account-tones";
import {
    ALERT_TYPE_COUNT,
    alertDeliveryCount,
    enabledAlertCount,
} from "@/lib/data/alerts-preferences";
import type {
    AlertPreference,
    AlertType,
    ConfigField,
    StatDatum,
} from "@/lib/types";
import { formatCount, percentOf } from "@/lib/utils";
import type { User } from "@/lib/validations/user";

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

export const EMPTY_PROFILE = {
    fullName: "",
    email: "",
    phone: "",
    bio: "",
};
export type ProfileForm = typeof EMPTY_PROFILE;

export const toProfileForm = (user: User | undefined): ProfileForm => ({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    phone: user?.phoneNumber ?? "",
    bio: user?.bio ?? "",
});

export const changedFieldCount = (
    current: ProfileForm,
    initial: ProfileForm,
) => {
    const baseline: Record<string, string> = initial;
    return Object.entries(current).filter(
        ([key, value]) => baseline[key] !== value,
    ).length;
};

export const profileStrength = (form: ProfileForm) =>
    percentOf(
        Object.values(form).filter((value) => value.trim().length > 0).length,
        Object.keys(form).length,
    );

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
        name: "bio",
        label: "About You",
        placeholder: "What you are looking for",
    },
];

export const buildDashboardSettingsStats = (
    strength: number,
    verified: number,
    documents: number,
    preferences: Record<AlertType, AlertPreference>,
): StatDatum[] => [
    {
        id: "strength",
        icon: UserCheck,
        label: "Profile strength",
        value: `${strength}%`,
        tone: strengthTone(strength),
    },
    {
        id: "verification",
        icon: Wallet,
        label: "Verified",
        value: `${verified}/${documents}`,
        tone: verified === documents ? "accent" : "neutral",
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
        tone: "neutral",
    },
    {
        id: "documents",
        icon: BadgeCheck,
        label: "Documents",
        value: `${verified}/${documents}`,
        tone: verified === documents ? "accent" : "neutral",
    },
];
