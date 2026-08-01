"use client";

import {
    StatusBadge,
    type StatusBadgeProps,
} from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import type {
    DataTableColumn,
    DataTableConfig,
} from "@/components/patterns/data-table";
import {
    UserCell,
    UserRowActions,
} from "@/components/features/admin/user-table-cells";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type {
    ManagedUser,
    ManagedUserRole,
    UserStatus,
    UserTier,
} from "@/lib/types";

type Tone = NonNullable<StatusBadgeProps["tone"]>;

const roleMeta: Record<ManagedUserRole, { label: string; cls: string }> = {
    admin: { label: "Admin", cls: "bg-error/10 text-error" },
    agent: { label: "Agent", cls: "bg-accent-light text-accent" },
    buyer: { label: "Buyer", cls: "bg-info/10 text-info" },
};

const tierMeta: Record<UserTier, { label: string; cls: string; rank: number }> =
    {
        platinum: { label: "Platinum", cls: "text-highlight-dark", rank: 3 },
        premium: { label: "Premium", cls: "text-info", rank: 2 },
        standard: { label: "Standard", cls: "text-text-muted", rank: 1 },
    };

export const userStatusMeta: Record<
    UserStatus,
    { tone: Tone; label: string; rowTone?: string }
> = {
    active: { tone: "success", label: "Active" },
    suspended: {
        tone: "error",
        label: "Suspended",
        rowTone: "bg-error/[0.035]",
    },
    inactive: { tone: "neutral", label: "Inactive" },
};

export function buildUserColumns(
    onStatusChange?: (ids: string[], status: UserStatus) => void,
): DataTableColumn<ManagedUser>[] {
    return [
        {
            id: "user",
            label: "User",
            sortValue: (row) => row.name,
            render: (row) => <UserCell user={row} />,
        },
        {
            id: "role",
            label: "Role",
            sortValue: (row) => roleMeta[row.role].label,
            render: (row) => (
                <span
                    className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                        roleMeta[row.role].cls,
                    )}
                >
                    {roleMeta[row.role].label}
                </span>
            ),
        },
        {
            id: "tier",
            label: "Tier",
            sortValue: (row) => tierMeta[row.tier].rank,
            render: (row) => (
                <span className={cn("font-medium", tierMeta[row.tier].cls)}>
                    {tierMeta[row.tier].label}
                </span>
            ),
        },
        {
            id: "joined",
            label: "Joined",
            sortValue: (row) => row.joinDate,
            render: (row) => (
                <span className="text-text-secondary whitespace-nowrap tabular-nums">
                    {row.joinDate}
                </span>
            ),
        },
        {
            id: "transactions",
            label: "Deals",
            align: "right",
            sortValue: (row) => row.transactions,
            render: (row) => (
                <span className="text-text font-medium tabular-nums">
                    {row.transactions}
                </span>
            ),
        },
        {
            id: "status",
            label: "Status",
            sortValue: (row) => userStatusMeta[row.status].label,
            render: (row) => (
                <StatusBadge tone={userStatusMeta[row.status].tone}>
                    {userStatusMeta[row.status].label}
                </StatusBadge>
            ),
        },
        {
            id: "actions",
            label: "Actions",
            align: "right",
            srOnlyLabel: true,
            render: (row) => (
                <UserRowActions user={row} onStatusChange={onStatusChange} />
            ),
        },
    ];
}

export function buildUserTableConfig(
    onStatusChange?: (ids: string[], status: UserStatus) => void,
    pageSize: number = TABLE_PAGE_SIZE,
): DataTableConfig<ManagedUser> {
    return {
        columns: buildUserColumns(onStatusChange),
        rowKey: (row) => row.id,
        rowClassName: (row) => userStatusMeta[row.status].rowTone,
        caption:
            "Platform users with role, tier, join date, deal count and account status",
        emptyMessage: "No users to show",
        defaultSort: { id: "user", direction: "asc" },
        selectable: true,
        pageSize,
        bulkActions: (rows) => (
            <>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                        onStatusChange?.(
                            rows.map((row) => row.id),
                            "active",
                        )
                    }
                >
                    Reactivate
                </Button>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                        onStatusChange?.(
                            rows.map((row) => row.id),
                            "suspended",
                        )
                    }
                >
                    Suspend
                </Button>
            </>
        ),
    };
}
