import type { NotificationRule, SecurityControl } from "@/lib/types";

export const NOTIFICATION_RULES: readonly NotificationRule[] = [
    {
        id: "CONNECTION_REQUEST",
        channel: "push",
        title: "New Lead Alerts",
        cadence: "instant",
    },
    {
        id: "OFFER_RESPONSE",
        channel: "push",
        title: "Offer Activity",
        cadence: "instant",
    },
    {
        id: "VIEWING_CONFIRMATION",
        channel: "sms",
        title: "Showing Reminders",
        cadence: "instant",
    },
    {
        id: "MESSAGE_RECEIVED",
        channel: "email",
        title: "Client Messages",
        cadence: "daily",
    },
    {
        id: "STATUS_CHANGE",
        channel: "email",
        title: "Listing Milestones",
        cadence: "daily",
    },
    {
        id: "UNDER_OFFER",
        channel: "email",
        title: "Under Offer",
        cadence: "daily",
    },
];

export const AGENT_SECURITY_DIALOG = "password" as const;

export type AgentSecurityDialog = typeof AGENT_SECURITY_DIALOG;

export const SECURITY_CONTROLS: readonly SecurityControl<AgentSecurityDialog>[] =
    [
        {
            id: "password",
            label: "Password",
            caption: "Send a reset link to the email on this account",
            action: "Send link",
            state: "enabled",
        },
    ];
