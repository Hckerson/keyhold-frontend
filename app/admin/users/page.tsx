import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import type { BadgeTone } from "@/components/dashboard/contact-row";
import { cn } from "@/lib/utils";

type Role = "buyer" | "agent" | "admin";
type Tier = "standard" | "premium" | "platinum";
type Status = "active" | "suspended" | "inactive";

interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    tier: Tier;
    joinDate: string;
    status: Status;
    transactions: number;
}

const users: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "buyer",
        tier: "standard",
        joinDate: "2024-01-15",
        status: "active",
        transactions: 2,
    },
    {
        id: "2",
        name: "Sarah Chen",
        email: "sarah@example.com",
        role: "agent",
        tier: "premium",
        joinDate: "2023-06-20",
        status: "active",
        transactions: 15,
    },
    {
        id: "3",
        name: "Robert Astor",
        email: "robert@example.com",
        role: "buyer",
        tier: "platinum",
        joinDate: "2023-03-10",
        status: "active",
        transactions: 5,
    },
    {
        id: "4",
        name: "Marcus Sterling",
        email: "marcus@example.com",
        role: "agent",
        tier: "standard",
        joinDate: "2024-05-01",
        status: "suspended",
        transactions: 0,
    },
];

const roleMeta: Record<Role, { label: string; cls: string }> = {
    admin: { label: "Admin", cls: "bg-error/10 text-error" },
    agent: { label: "Agent", cls: "bg-accent-light text-accent" },
    buyer: { label: "Buyer", cls: "bg-info/10 text-info" },
};

const tierColor: Record<Tier, string> = {
    platinum: "text-highlight-dark",
    premium: "text-info",
    standard: "text-text-muted",
};

const statusMeta: Record<Status, { tone: BadgeTone; label: string }> = {
    active: { tone: "success", label: "Active" },
    suspended: { tone: "error", label: "Suspended" },
    inactive: { tone: "neutral", label: "Inactive" },
};

const th =
    "px-4 py-2.5 text-left font-mono text-[10px] font-medium uppercase tracking-wide text-text-muted";

function initials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function AdminUsersPage() {
    const active = users.filter((u) => u.status === "active").length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="User Management"
                description={`${active} active user${active !== 1 ? "s" : ""} · ${users.length} total`}
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                            Filter
                        </Button>
                        <Button variant="primary" size="sm">
                            Add User
                        </Button>
                    </div>
                }
            />

            <div className="bg-background-muted border-border-light overflow-hidden rounded-xl border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-border-light border-b">
                                <th className={th}>User</th>
                                <th className={th}>Role</th>
                                <th className={th}>Tier</th>
                                <th className={th}>Joined</th>
                                <th className={cn(th, "text-right")}>Deals</th>
                                <th className={th}>Status</th>
                                <th className={cn(th, "text-right")}>
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-border-light divide-y">
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-background-alt ease-smooth transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <span className="bg-accent-light text-accent grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold">
                                                {initials(user.name)}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-text truncate font-medium">
                                                    {user.name}
                                                </p>
                                                <p className="text-text-muted truncate text-xs">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={cn(
                                                "rounded-full px-2 py-0.5 text-xs font-medium",
                                                roleMeta[user.role].cls,
                                            )}
                                        >
                                            {roleMeta[user.role].label}
                                        </span>
                                    </td>
                                    <td
                                        className={cn(
                                            "px-4 py-3 font-medium",
                                            tierColor[user.tier],
                                        )}
                                    >
                                        {user.tier.charAt(0).toUpperCase() +
                                            user.tier.slice(1)}
                                    </td>
                                    <td className="text-text-secondary px-4 py-3 whitespace-nowrap tabular-nums">
                                        {user.joinDate}
                                    </td>
                                    <td className="text-text px-4 py-3 text-right font-medium tabular-nums">
                                        {user.transactions}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge
                                            tone={statusMeta[user.status].tone}
                                            dot
                                        >
                                            {statusMeta[user.status].label}
                                        </StatusBadge>
                                    </td>
                                    <td className="px-4 py-3">
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
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    Reactivate
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
