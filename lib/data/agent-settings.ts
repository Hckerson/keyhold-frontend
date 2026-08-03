import type { ConfigField } from "@/components/patterns/config-field-grid";
import type { SettingsToggle } from "@/lib/data/dashboard-settings";

export const INITIAL_AGENT_FORM = {
    fullName: "Sarah Mitchell",
    email: "sarah@agentpro.com",
    phone: "(310) 555-0180",
    brokerage: "Agent Pro Realty",
    license: "DRE #01987654",
    serviceArea: "Beverly Hills, CA",
    commissionRate: "2.5",
    responseTime: "2",
};
export type AgentSettingsForm = typeof INITIAL_AGENT_FORM;

export const AGENT_PROFILE_FIELDS: readonly ConfigField<
    keyof AgentSettingsForm
>[] = [
    { name: "fullName", label: "Full Name", placeholder: "Sarah Mitchell" },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "sarah@agentpro.com",
    },
    {
        name: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "(310) 555-0180",
        variant: "numeric",
    },
    { name: "brokerage", label: "Brokerage", placeholder: "Agent Pro Realty" },
    {
        name: "license",
        label: "License Number",
        placeholder: "DRE #01987654",
        variant: "code",
    },
    {
        name: "serviceArea",
        label: "Service Area",
        placeholder: "Beverly Hills, CA",
    },
];

export const AGENT_BUSINESS_FIELDS: readonly ConfigField<
    keyof AgentSettingsForm
>[] = [
    {
        name: "commissionRate",
        label: "Commission Rate",
        placeholder: "2.5",
        suffix: "%",
        variant: "numeric",
    },
    {
        name: "responseTime",
        label: "Lead Response Target",
        placeholder: "2",
        suffix: "hours",
        variant: "numeric",
    },
];

export const AGENT_NOTIFICATION_TOGGLES: readonly SettingsToggle[] = [
    {
        title: "New Lead Alerts",
        description: "Notify me the moment an inquiry arrives",
        defaultChecked: true,
    },
    {
        title: "Offer Activity",
        description: "Offers, counters, and acceptances on my listings",
        defaultChecked: true,
    },
    {
        title: "Showing Reminders",
        description: "Reminders one hour before each appointment",
        defaultChecked: true,
    },
    {
        title: "Weekly Performance Digest",
        description: "Views, saves, and pipeline movement every Monday",
        defaultChecked: false,
    },
];
