"use client";

import { format } from "date-fns";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import type {
    DataTableColumn,
    DataTableConfig,
} from "@/components/patterns/data-table";
import {
    UserDetail,
    UserPanelActions,
} from "@/components/features/admin/user-detail";
import {
    RoleChip,
    TierLabel,
    UserCell,
    roleMeta,
    tierMeta,
    userStatusMeta,
} from "@/components/features/admin/user-table-cells";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import { formatCompactUsd, formatCount, parseLocalDate } from "@/lib/utils";
import type { ManagedUser, UserStatus } from "@/lib/types";

const ACTIVE_FORMAT = "MMM d, yyyy";

const sumVolume = (rows: ManagedUser[]) =>
    rows.reduce((total, row) => total + row.volume, 0);

const sumDeals = (rows: ManagedUser[]) =>
    rows.reduce((total, row) => total + row.transactions, 0);

export function buildUserColumns(): DataTableColumn<ManagedUser>[] {
    return [
        {
            id: "user",
            label: "User",
            sortValue: (row) => row.name,
            render: (row) => <UserCell user={row} />,
            footer: () => <span className="micro-label">Total</span>,
        },
        {
            id: "role",
            label: "Role",
            width: "5.5rem",
            sortValue: (row) => roleMeta[row.role].rank,
            render: (row) => <RoleChip role={row.role} />,
        },
        {
            id: "tier",
            label: "Tier",
            width: "6rem",
            sortValue: (row) => tierMeta[row.tier].rank,
            render: (row) => <TierLabel tier={row.tier} />,
        },
        {
            id: "deals",
            label: "Deals",
            align: "right",
            width: "4.5rem",
            emphasis: "figure",
            sortValue: (row) => row.transactions,
            render: (row) =>
                row.transactions > 0 ? (
                    <span className="text-text-secondary">
                        {row.transactions}
                    </span>
                ) : (
                    <span className="text-text-muted">—</span>
                ),
            footer: (rows) => formatCount(sumDeals(rows)),
        },
        {
            id: "volume",
            label: "Volume",
            align: "right",
            width: "7.5rem",
            emphasis: "focal",
            sortValue: (row) => row.volume,
            render: (row) =>
                row.volume > 0 ? (
                    formatCompactUsd(row.volume)
                ) : (
                    <span className="text-text-muted text-xs">—</span>
                ),
            footer: (rows) => (
                <span className="text-accent">
                    {formatCompactUsd(sumVolume(rows))}
                </span>
            ),
        },
        {
            id: "lastActive",
            label: "Last active",
            width: "7.5rem",
            emphasis: "meta",
            sortValue: (row) => row.lastActive,
            render: (row) => (
                <span className="whitespace-nowrap">
                    {format(parseLocalDate(row.lastActive), ACTIVE_FORMAT)}
                </span>
            ),
        },
        {
            id: "status",
            label: "Status",
            width: "6.5rem",
            sortValue: (row) => userStatusMeta[row.status].rank,
            render: (row) => (
                <StatusBadge tone={userStatusMeta[row.status].tone}>
                    {userStatusMeta[row.status].label}
                </StatusBadge>
            ),
        },
    ];
}

export function buildUserTableConfig(
    onStatusChange?: (ids: string[], status: UserStatus) => void,
    pageSize: number = TABLE_PAGE_SIZE,
): DataTableConfig<ManagedUser> {
    return {
        columns: buildUserColumns(),
        rowKey: (row) => row.id,
        rowLabel: (row) => row.name,
        rowClassName: (row) => userStatusMeta[row.status].rowTone,
        caption:
            "Platform users with role, tier, closed deal count, lifetime volume, last activity and account status",
        emptyMessage: "No users match these filters",
        defaultSort: { id: "volume", direction: "desc" },
        selectable: true,
        pageSize,
        reveal: "panel",
        panelSize: "md",
        panelTitle: (row) => row.name,
        renderDetail: (row) => <UserDetail user={row} />,
        panelFooter: (row) => (
            <UserPanelActions user={row} onStatusChange={onStatusChange} />
        ),
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
