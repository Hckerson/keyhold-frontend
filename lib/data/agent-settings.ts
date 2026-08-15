import { BadgeCheck, BellRing, Radio, Timer, UserCheck } from "lucide-react";
import type { ConfigField } from "@/components/patterns/config-field-grid";
import type { StatDatum } from "@/components/patterns/stat-cell";
import { responseTone, strengthTone } from "@/lib/config/agent-settings-tones";
import {
    CREDENTIAL_COUNT,
    enabledNotificationCount,
    NOTIFICATION_RULE_COUNT,
    PROFILE_STRENGTH,
    verifiedCredentialCount,
    weeklyAlertVolume,
    type NotificationState,
} from "@/lib/data/agent-account";
import { formatCount } from "@/lib/utils";

export const AGENT_SETTINGS_FORM_ID = "agent-settings-form";

export const PROFILE_PUBLISHED = {
    actor: "Sarah Mitchell",
    role: "Listing agent",
    ageMinutes: 420,
};

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

export const changedFieldCount = (current: AgentSettingsForm) => {
    const initial: Record<string, string> = INITIAL_AGENT_FORM;
    return Object.entries(current).filter(
        ([key, value]) => initial[key] !== value,
    ).length;
};

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

export const buildAgentSettingsStats = (
    form: AgentSettingsForm,
    state: NotificationState,
): StatDatum[] => [
    {
        id: "strength",
        icon: UserCheck,
        label: "Profile strength",
        value: `${PROFILE_STRENGTH}%`,
        tone: strengthTone(PROFILE_STRENGTH),
    },
    {
        id: "alerts",
        icon: BellRing,
        label: "Alerts on",
        value: `${enabledNotificationCount(state)}/${NOTIFICATION_RULE_COUNT}`,
        tone: "accent",
    },
    {
        id: "volume",
        icon: Radio,
        label: "Weekly sends",
        value: formatCount(weeklyAlertVolume(state)),
        tone: "info",
    },
    {
        id: "response",
        icon: Timer,
        label: "Response target",
        value: `${form.responseTime || 0}h`,
        tone: responseTone(Number(form.responseTime)),
    },
    {
        id: "credentials",
        icon: BadgeCheck,
        label: "Credentials",
        value: `${verifiedCredentialCount}/${CREDENTIAL_COUNT}`,
        tone:
            verifiedCredentialCount === CREDENTIAL_COUNT
                ? "success"
                : "warning",
    },
];
