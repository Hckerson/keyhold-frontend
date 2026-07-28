import type { ConfigField } from "@/components/patterns/config-field-grid";

export type ContactMethod = "email" | "sms" | "phone" | "in-app";
export type SettingsDialogKey = "password" | "two-factor" | "delete";

export interface SettingsToggle {
    title: string;
    description: string;
    defaultChecked: boolean;
}

export const DATA_EXPORT_FILENAME = "account-data.json";
export const DELETE_CONFIRMATION = "DELETE";
export const MIN_PASSWORD_LENGTH = 8;
export const TWO_FACTOR_CODE_LENGTH = 6;
export const SAVED_FEEDBACK_MS = 2000;

export const CONTACT_METHODS: { value: ContactMethod; label: string }[] = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "phone", label: "Phone" },
    { value: "in-app", label: "In-app" },
];

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
    },
    {
        name: "budgetMax",
        label: "Maximum Budget",
        placeholder: "5,000,000",
        prefix: "$",
    },
];

export const INITIAL_NOTIFICATIONS = { email: true, sms: false, inApp: true };
export type NotificationPreferences = typeof INITIAL_NOTIFICATIONS;

export const NOTIFICATION_TOGGLES: {
    key: keyof NotificationPreferences;
    title: string;
    description: string;
}[] = [
    {
        key: "email",
        title: "Email Notifications",
        description: "Receive alerts via email",
    },
    {
        key: "sms",
        title: "SMS Notifications",
        description: "Receive alerts via text message",
    },
    {
        key: "inApp",
        title: "In-App Notifications",
        description: "See updates in your dashboard",
    },
];
