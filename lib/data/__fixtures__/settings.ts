import type { PlatformSetting } from "@/lib/validations/setting";

export const SETTINGS_TODAY = new Date("2026-10-12T12:00:00Z");

export const aPlatformSetting = (
    overrides: Partial<PlatformSetting> = {},
): PlatformSetting => ({
    key: "commissionRate",
    value: "2.5",
    category: "COMMERCE",
    updatedBy: {
        id: "usr_admin",
        fullName: "Platform Administrator",
        role: "ADMIN",
    },
    updatedAt: "2026-10-11T12:00:00.000Z",
    ...overrides,
});
