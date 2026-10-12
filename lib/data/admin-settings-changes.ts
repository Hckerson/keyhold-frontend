import {
    ADMIN_CONFIG_KEYS,
    MARKETPLACE_FIELDS,
    PLATFORM_FIELDS,
    type AdminConfig,
    type AdminConfigKey,
} from "@/lib/config/admin-settings";
import { POLICY_SETTING_KEY, POLICY_SWITCHES } from "@/lib/data/admin-policies";
import { formatAge, formatCountOf } from "@/lib/utils";
import { minutesSince } from "@/lib/utils/elapsed";
import type { ConfigField, PolicyState, SettingChange } from "@/lib/types";
import { toFieldErrors, type FieldErrors } from "@/lib/validations/auth";
import {
    adminConfigSchema,
    type PlatformSetting,
    type SettingEditor,
} from "@/lib/validations/setting";

type EditedSetting = PlatformSetting & {
    updatedAt: string;
    updatedBy: SettingEditor;
};

const ON = "On";
const OFF = "Off";
const TRUE = "true";
const BLANK = "blank";
const UNSAVED_NOUN = "unsaved change";
const FIELD_NOUN = "field";

const CONFIG_FIELDS = [...PLATFORM_FIELDS, ...MARKETPLACE_FIELDS];

const fieldOf = (key: string) =>
    CONFIG_FIELDS.find((field) => field.name === key);

const policyOf = (key: string) =>
    POLICY_SWITCHES.find((policy) => POLICY_SETTING_KEY[policy.id] === key);

const unitOf = (suffix: string) =>
    suffix.length === 1 ? suffix : ` ${suffix}`;

const isEdited = (setting: PlatformSetting): setting is EditedSetting =>
    setting.updatedAt !== null && setting.updatedBy !== null;

export const formatFieldValue = (
    field: ConfigField<AdminConfigKey>,
    value: string,
) => {
    if (!value) return BLANK;
    const option = field.options?.find((choice) => choice.value === value);
    if (option) return option.label;
    return `${field.prefix ?? ""}${value}${field.suffix ? unitOf(field.suffix) : ""}`;
};

const describe = (key: string, value: string) => {
    const field = fieldOf(key);
    if (field)
        return { label: field.label, value: formatFieldValue(field, value) };
    const policy = policyOf(key);
    if (policy)
        return { label: policy.title, value: value === TRUE ? ON : OFF };
    return null;
};

export const recentSettingChanges = (
    settings: PlatformSetting[],
    now = new Date(),
): SettingChange[] =>
    settings
        .filter(isEdited)
        .sort(
            (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
        )
        .flatMap((setting) => {
            const described = describe(setting.key, setting.value);
            if (!described) return [];
            return [
                {
                    key: setting.key,
                    ...described,
                    editor: setting.updatedBy.fullName,
                    ageMinutes: minutesSince(setting.updatedAt, now),
                },
            ];
        });

export const lastEditLine = (changes: SettingChange[]) => {
    const latest = changes[0];
    return latest
        ? `Last changed ${formatAge(latest.ageMinutes)} ago`
        : undefined;
};

export const unsavedLabels = (
    config: AdminConfig,
    baseline: AdminConfig,
    policies: PolicyState,
    baselinePolicies: PolicyState,
) => [
    ...ADMIN_CONFIG_KEYS.filter((key) => config[key] !== baseline[key]).map(
        (key) => fieldOf(key)?.label ?? key,
    ),
    ...POLICY_SWITCHES.filter(
        (policy) => policies[policy.id] !== baselinePolicies[policy.id],
    ).map((policy) => policy.title),
];

export const unsavedLine = (labels: string[]) =>
    formatCountOf(labels.length, UNSAVED_NOUN);

export const withBaselineHints = (
    fields: readonly ConfigField<AdminConfigKey>[],
    config: AdminConfig,
    baseline: AdminConfig,
): ConfigField<AdminConfigKey>[] =>
    fields.map((field) =>
        config[field.name] === baseline[field.name]
            ? field
            : {
                  ...field,
                  hint: `Was ${formatFieldValue(field, baseline[field.name])}`,
              },
    );

export const configErrors = (config: AdminConfig): FieldErrors => {
    const parsed = adminConfigSchema.safeParse(config);
    return parsed.success ? {} : toFieldErrors(parsed.error);
};

export const errorCount = (errors: FieldErrors) =>
    Object.values(errors).filter(Boolean).length;

export const fixLine = (count: number) =>
    `Fix ${formatCountOf(count, FIELD_NOUN)} before saving`;
