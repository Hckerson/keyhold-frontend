import type { ReactNode } from "react";
import { UserRoleMark } from "@/components/features/admin/user-role-mark";
import { idleDays, joinedLabel } from "@/lib/data/admin-users";
import type { ManagedUser } from "@/lib/types";

const IDLE_SUFFIX = "days ago";
const TODAY_LABEL = "Today";

export interface UserAccountListProps {
    user: ManagedUser;
}

export function UserAccountList({ user }: UserAccountListProps) {
    const days = idleDays(user);

    const rows: { id: string; label: string; value: ReactNode }[] = [
        { id: "email", label: "Email", value: user.email },
        {
            id: "role",
            label: "Role",
            value: <UserRoleMark role={user.role} />,
        },
        { id: "joined", label: "Joined", value: joinedLabel(user) },
        {
            id: "active",
            label: "Last sign-in",
            value: days === 0 ? TODAY_LABEL : `${days} ${IDLE_SUFFIX}`,
        },
    ];

    return (
        <dl className="divide-border divide-y">
            {rows.map((row) => (
                <div
                    key={row.id}
                    className="flex h-9 items-center justify-between gap-3"
                >
                    <dt className="micro-label shrink-0">{row.label}</dt>
                    <dd className="text-text min-w-0 truncate text-xs font-medium">
                        {row.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

UserAccountList.displayName = "UserAccountList";
