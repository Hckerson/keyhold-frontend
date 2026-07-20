import { Button } from "@/components/ui/button";
import {
    StatusBadge,
    type StatusBadgeProps,
} from "@/components/ui/status-badge";
import {
    DataTable,
    type DataTableColumn,
} from "@/components/patterns/data-table";
import { cn } from "@/lib/utils";

/* --------------------------------- Types --------------------------------- */

type Tone = NonNullable<StatusBadgeProps["tone"]>;

export type UserRole = "buyer" | "agent" | "admin";
export type UserTier = "standard" | "premium" | "platinum";
export type UserStatus = "active" | "suspended" | "inactive";

export interface ManagedUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    tier: UserTier;
    joinDate: string;
    status: UserStatus;
    transactions: number;
}

export interface UserTableProps {
    users: ManagedUser[];
    className?: string;
}

const roleMeta: Record<UserRole, { label: string; cls: string }> = {
    admin: { label: "Admin", cls: "bg-error/10 text-error" },
    agent: { label: "Agent", cls: "bg-accent-light text-accent" },
    buyer: { label: "Buyer", cls: "bg-info/10 text-info" },
};

const tierMeta: Record<UserTier, { label: string; cls: string }> = {
    platinum: { label: "Platinum", cls: "text-highlight-dark" },
    premium: { label: "Premium", cls: "text-info" },
    standard: { label: "Standard", cls: "text-text-muted" },
};

const statusMeta: Record<
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

function initialsOf(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

/* --------------------------------- Cells --------------------------------- */

function UserCell({ user }: { user: ManagedUser }) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="bg-accent-light text-accent grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold">
                {initialsOf(user.name)}
            </span>
            <div className="min-w-0">
                <p className="text-text truncate font-medium">{user.name}</p>
                <p className="text-text-muted truncate text-xs">{user.email}</p>
            </div>
        </div>
    );
}

function RowActions({ user }: { user: ManagedUser }) {
    return (
        <div className="flex justify-end gap-1">
            <Button variant="ghost" size="sm">
                View
            </Button>
            {user.status === "active" && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-error hover:text-error"
                >
                    Suspend
                </Button>
            )}
            {user.status === "suspended" && (
                <Button variant="ghost" size="sm">
                    Reactivate
                </Button>
            )}
        </div>
    );
}

/* -------------------------------- Columns -------------------------------- */

const columns: DataTableColumn<ManagedUser>[] = [
    {
        id: "user",
        label: "User",
        render: (row) => <UserCell user={row} />,
    },
    {
        id: "role",
        label: "Role",
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
        render: (row) => (
            <span className={cn("font-medium", tierMeta[row.tier].cls)}>
                {tierMeta[row.tier].label}
            </span>
        ),
    },
    {
        id: "joined",
        label: "Joined",
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
        render: (row) => (
            <span className="text-text font-medium tabular-nums">
                {row.transactions}
            </span>
        ),
    },
    {
        id: "status",
        label: "Status",
        render: (row) => (
            <StatusBadge tone={statusMeta[row.status].tone}>
                {statusMeta[row.status].label}
            </StatusBadge>
        ),
    },
    {
        id: "actions",
        label: "Actions",
        align: "right",
        srOnlyLabel: true,
        render: (row) => <RowActions user={row} />,
    },
];

/* --------------------------------- Table --------------------------------- */

export function UserTable({ users, className }: UserTableProps) {
    return (
        <DataTable
            columns={columns}
            data={users}
            rowKey={(row) => row.id}
            rowClassName={(row) => statusMeta[row.status].rowTone}
            caption="Platform users with role, tier, join date, deal count and account status"
            emptyMessage="No users to show"
            className={className}
        />
    );
}

UserTable.displayName = "UserTable";
