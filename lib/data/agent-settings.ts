import { BadgeCheck, BellRing, UserCheck } from "lucide-react";
import { strengthTone } from "@/lib/config/account-tones";
import {
    enabledNotificationCount,
    NOTIFICATION_RULE_COUNT,
} from "@/lib/data/agent-account";
import type { UpdateUserInput, User } from "@/lib/validations/user";
import type { ConfigField, NotificationState, StatDatum } from "@/lib/types";

export const AGENT_SETTINGS_FORM_ID = "agent-settings-form";

export const EMPTY_AGENT_FORM = {
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    brokerage: "",
    license: "",
    bio: "",
};
export type AgentSettingsForm = typeof EMPTY_AGENT_FORM;

export const toAgentForm = (user: User | undefined): AgentSettingsForm => ({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    phone: user?.phoneNumber ?? "",
    jobTitle: user?.jobTitle ?? "",
    brokerage: user?.agencyName ?? "",
    license: user?.licenseNumber ?? "",
    bio: user?.bio ?? "",
});

export const toAgentUserPayload = (
    form: AgentSettingsForm,
): UpdateUserInput => ({
    fullName: form.fullName,
    email: form.email,
    phoneNumber: form.phone,
    jobTitle: form.jobTitle,
    agencyName: form.brokerage,
    licenseNumber: form.license,
    bio: form.bio,
});

export const changedFieldCount = (
    current: AgentSettingsForm,
    initial: AgentSettingsForm,
) => {
    const baseline: Record<string, string> = initial;
    return Object.entries(current).filter(
        ([key, value]) => baseline[key] !== value,
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
    { name: "jobTitle", label: "Title", placeholder: "Senior Advisor" },
    {
        name: "bio",
        label: "Biography",
        placeholder: "How you work with buyers",
    },
];

export const buildAgentSettingsStats = (
    strength: number,
    verified: number,
    credentials: number,
    state: NotificationState,
): StatDatum[] => [
    {
        id: "strength",
        icon: UserCheck,
        label: "Profile strength",
        value: `${strength}%`,
        tone: strengthTone(strength),
    },
    {
        id: "alerts",
        icon: BellRing,
        label: "Alerts on",
        value: `${enabledNotificationCount(state)}/${NOTIFICATION_RULE_COUNT}`,
        tone: "accent",
    },
    {
        id: "credentials",
        icon: BadgeCheck,
        label: "Credentials",
        value: `${verified}/${credentials}`,
        tone: verified === credentials ? "success" : "warning",
    },
];
