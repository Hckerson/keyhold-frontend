import type { ChartTone } from "@/lib/config/chart-tones";
import { USER_ROLES, USER_ROLE_KEYS } from "@/lib/config/user-tones";
import type { UserRole } from "@/lib/enums/enums";
import type { ManagedUserRole } from "@/lib/types/user";
import type { TierDistribution, User } from "@/lib/validations/user";
import type { UserTier } from "@/lib/enums/enums";
import type { DonutSegment } from "@/lib/types";

export const MANAGED_ROLE_BY_USER: Record<UserRole, ManagedUserRole> = {
    BUYER: "buyer",
    SELLER: "agent",
    ADMIN: "admin",
};

export const toRoleSegments = (users: User[]): DonutSegment[] =>
    USER_ROLE_KEYS.map((role) => ({
        name: USER_ROLES[role].plural,
        value: users.filter((user) => MANAGED_ROLE_BY_USER[user.role] === role)
            .length,
        tone: USER_ROLES[role].tone,
    }));

const TIER_SEGMENTS: Record<UserTier, { name: string; tone: ChartTone }> = {
    STANDARD: { name: "Standard", tone: "neutral" },
    PREMIUM: { name: "Premium", tone: "info" },
    PLATINUM: { name: "Platinum", tone: "highlight" },
};

export const toTierSegments = (
    distribution: TierDistribution | undefined,
): DonutSegment[] =>
    (distribution?.segments ?? []).map((segment) => ({
        name: TIER_SEGMENTS[segment.tier].name,
        value: segment.count,
        tone: TIER_SEGMENTS[segment.tier].tone,
    }));
