"use client";

import type { StatusBadgeProps } from "@/components/ui/status-badge";
import { cn, initialsOf } from "@/lib/utils";
import type {
    ManagedUser,
    ManagedUserRole,
    UserStatus,
    UserTier,
} from "@/lib/types";

type Tone = NonNullable<StatusBadgeProps["tone"]>;

const chipBase =
    "inline-flex items-center rounded-full border px-1.5 py-0.5 font-mono text-[10px] leading-none font-medium tracking-wide uppercase";

export const roleMeta: Record<
    ManagedUserRole,
    { label: string; plural: string; cls: string; rank: number }
> = {
    admin: {
        label: "Admin",
        plural: "Admins",
        cls: "border-accent/30 text-accent",
        rank: 3,
    },
    agent: {
        label: "Agent",
        plural: "Agents",
        cls: "border-border-dark text-text-secondary",
        rank: 2,
    },
    buyer: {
        label: "Buyer",
        plural: "Buyers",
        cls: "border-border text-text-muted",
        rank: 1,
    },
};

export const tierMeta: Record<
    UserTier,
    { label: string; cls: string; rank: number }
> = {
    platinum: { label: "Platinum", cls: "text-highlight-dark", rank: 3 },
    premium: { label: "Premium", cls: "text-text-secondary", rank: 2 },
    standard: { label: "Standard", cls: "text-text-muted", rank: 1 },
};

export const userStatusMeta: Record<
    UserStatus,
    { tone: Tone; label: string; rank: number; rowTone?: string; note?: string }
> = {
    active: { tone: "success", label: "Active", rank: 1 },
    inactive: {
        tone: "neutral",
        label: "Inactive",
        rank: 2,
        note: "No sign-in recorded in the last 30 days.",
    },
    suspended: {
        tone: "error",
        label: "Suspended",
        rank: 3,
        rowTone: "bg-error/[0.035]",
        note: "This account cannot list, bid or transact until it is reactivated.",
    },
};

export function UserCell({ user }: { user: ManagedUser }) {
    return (
        <div className="flex items-center gap-2.5">
            <span
                aria-hidden="true"
                className="bg-accent-light text-accent grid size-7 shrink-0 place-items-center rounded-full font-mono text-[10px] font-medium"
            >
                {initialsOf(user.name)}
            </span>
            <div className="min-w-0">
                <p className="text-text truncate font-medium">{user.name}</p>
                <p className="text-text-muted truncate">{user.email}</p>
            </div>
        </div>
    );
}

export function RoleChip({ role }: { role: ManagedUserRole }) {
    return (
        <span className={cn(chipBase, roleMeta[role].cls)}>
            {roleMeta[role].label}
        </span>
    );
}

export function TierLabel({ tier }: { tier: UserTier }) {
    return (
        <span
            className={cn(
                "font-mono text-[10px] font-medium tracking-wide uppercase",
                tierMeta[tier].cls,
            )}
        >
            {tierMeta[tier].label}
        </span>
    );
}
