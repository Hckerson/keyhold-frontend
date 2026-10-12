import { POLICY_SETTING_KEY, POLICY_SWITCHES } from "@/lib/data/admin-policies";
import {
    ADMIN_CONFIG_KEYS,
    type AdminConfig,
} from "@/lib/config/admin-settings";
import type { PolicyState } from "@/lib/types";
import type {
    PlatformSetting,
    UpdateSettingsInput,
} from "@/lib/validations/setting";
import type { SettingCategory } from "@/lib/enums/enums";

export const SETTINGS_FORM_ID = "admin-settings-form";

export const SETTINGS_COPY = {
    title: "Settings",
    lede: "What the platform charges, what it enforces, and how it runs",
    history: "History",
    historyTitle: "Recent changes",
    historyLede: "Each setting's current value and who set it last",
    platform: {
        id: "platform",
        title: "Platform",
        lede: "Identity and defaults used across every surface",
    },
    marketplace: {
        id: "marketplace",
        title: "Marketplace",
        lede: "Fees, limits and thresholds applied to new listings and payouts",
    },
    maintenance: {
        id: "maintenance",
        title: "Maintenance",
        lede: "One-off operations, each confirmed before it runs",
    },
    offlineTitle: "The marketplace is offline",
    offlineLede:
        "Maintenance mode is on, so only admins can reach the marketplace. Turn it off under Operations.",
    reset: "Reset",
    save: "Save changes",
    wasOn: "Was on",
    wasOff: "Was off",
} as const;

const TRUE = "true";

export const EMPTY_ADMIN_CONFIG: AdminConfig = ADMIN_CONFIG_KEYS.reduce(
    (config, key) => ({ ...config, [key]: "" }),
    {} as AdminConfig,
);

export const EMPTY_POLICY_STATE: PolicyState = POLICY_SWITCHES.reduce(
    (state, policy) => ({ ...state, [policy.id]: false }),
    {} as PolicyState,
);

export const toAdminConfig = (settings: PlatformSetting[]): AdminConfig => {
    const byKey = new Map(
        settings.map((setting) => [setting.key, setting.value]),
    );

    return ADMIN_CONFIG_KEYS.reduce(
        (config, key) => ({ ...config, [key]: byKey.get(key) ?? "" }),
        {} as AdminConfig,
    );
};

export const toPolicyState = (settings: PlatformSetting[]): PolicyState => {
    const byKey = new Map(
        settings.map((setting) => [setting.key, setting.value]),
    );

    return POLICY_SWITCHES.reduce(
        (state, policy) => ({
            ...state,
            [policy.id]: byKey.get(POLICY_SETTING_KEY[policy.id]) === TRUE,
        }),
        {} as PolicyState,
    );
};

export const toSettingsPayload = (
    settings: PlatformSetting[],
    config: AdminConfig,
    policies: PolicyState,
): UpdateSettingsInput => {
    const categoryOf = (key: string): SettingCategory =>
        settings.find((setting) => setting.key === key)?.category ?? "PLATFORM";

    return {
        settings: [
            ...ADMIN_CONFIG_KEYS.map((key) => ({
                key,
                value: config[key],
                category: categoryOf(key),
            })),
            ...POLICY_SWITCHES.map((policy) => ({
                key: POLICY_SETTING_KEY[policy.id],
                value: String(policies[policy.id]),
                category: categoryOf(POLICY_SETTING_KEY[policy.id]),
            })),
        ],
    };
};
