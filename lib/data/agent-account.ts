import { NOTIFICATION_RULES } from "@/lib/config/agent-account";
import type { AccountCredential, NotificationState } from "@/lib/types";
import type { User } from "@/lib/validations/user";
import type { NotificationPreference } from "@/lib/validations/notification";

const UNVERIFIED_ISSUER = "Not on file";
const IDENTITY_ISSUER = "Identity document";

export const EMPTY_NOTIFICATION_STATE: NotificationState =
    NOTIFICATION_RULES.reduce(
        (state, rule) => ({ ...state, [rule.id]: false }),
        {} as NotificationState,
    );

export const toNotificationState = (
    preferences: NotificationPreference[],
): NotificationState => {
    const byType = new Map(
        preferences.map((preference) => [preference.type, preference]),
    );

    return NOTIFICATION_RULES.reduce(
        (state, rule) => ({
            ...state,
            [rule.id]: byType.get(rule.id)?.enabled ?? false,
        }),
        {} as NotificationState,
    );
};

export const toNotificationPayload = (
    preferences: NotificationPreference[],
    state: NotificationState,
): NotificationPreference[] => {
    const byType = new Map(
        preferences.map((preference) => [preference.type, preference]),
    );

    return preferences.map((preference) => {
        const enabled = state[preference.type];
        return enabled === undefined
            ? preference
            : { ...(byType.get(preference.type) ?? preference), enabled };
    });
};

export const NOTIFICATION_RULE_COUNT = NOTIFICATION_RULES.length;

export const enabledNotificationCount = (state: NotificationState) =>
    NOTIFICATION_RULES.filter((rule) => state[rule.id]).length;

export const areNotificationsDirty = (
    state: NotificationState,
    baseline: NotificationState,
) => NOTIFICATION_RULES.some((rule) => state[rule.id] !== baseline[rule.id]);

export const agentCredentials = (
    user: User | undefined,
): AccountCredential[] => [
    {
        id: "email",
        label: "Email Address",
        issuer: user?.email ?? UNVERIFIED_ISSUER,
        state: user?.emailVerified ? "verified" : "missing",
        expiresInMinutes: 0,
    },
    {
        id: "phone",
        label: "Phone Number",
        issuer: user?.phoneNumber ?? UNVERIFIED_ISSUER,
        state: user?.phoneVerified ? "verified" : "missing",
        expiresInMinutes: 0,
    },
    {
        id: "identity",
        label: "Government ID",
        issuer: IDENTITY_ISSUER,
        state: user?.kycVerified ? "verified" : "missing",
        expiresInMinutes: 0,
    },
    {
        id: "licence",
        label: "Real Estate Licence",
        issuer: user?.agencyName ?? UNVERIFIED_ISSUER,
        state: user?.licenseNumber ? "verified" : "missing",
        expiresInMinutes: 0,
    },
];

export const verifiedCredentialCount = (credentials: AccountCredential[]) =>
    credentials.filter((credential) => credential.state === "verified").length;
