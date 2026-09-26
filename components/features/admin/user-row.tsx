"use client";

import { m } from "motion/react";
import { UserActivityMark } from "@/components/features/admin/user-activity-mark";
import { UserDealMark } from "@/components/features/admin/user-deal-mark";
import { UserMark } from "@/components/features/admin/user-mark";
import { UserRoleMark } from "@/components/features/admin/user-role-mark";
import { UserRowActions } from "@/components/features/admin/user-row-actions";
import { UserStatusMark } from "@/components/features/admin/user-status-mark";
import { UserVolumeMeter } from "@/components/features/admin/user-volume-meter";
import { USER_STATUSES } from "@/lib/config/user-tones";
import { idleDays } from "@/lib/data/admin-users";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";
import { cn } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

export interface UserRowProps {
    user: ManagedUser;
    peak: number;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function UserRow({
    user,
    peak,
    onOpen,
    onSuspend,
    reactivatingId,
    onReactivate,
}: UserRowProps) {
    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className={cn(
                "ease-smooth hover:bg-background-muted h-11 transition-colors",
                USER_STATUSES[user.status].rowTone,
            )}
        >
            <td className="py-0">
                <UserMark user={user} onOpen={onOpen} />
            </td>
            <td className="py-0 pl-3">
                <UserRoleMark role={user.role} />
            </td>
            <td className="py-0 pl-3 text-right">
                <UserDealMark deals={user.transactions} />
            </td>
            <td className="py-0 pl-3 text-right">
                <UserVolumeMeter volume={user.volume} peak={peak} />
            </td>
            <td className="py-0 pl-3 text-right">
                <UserActivityMark days={idleDays(user)} />
            </td>
            <td className="py-0 pl-3">
                <UserStatusMark status={user.status} />
            </td>
            <td className="py-0 pl-3">
                <UserRowActions
                    user={user}
                    onSuspend={onSuspend}
                    reactivatingId={reactivatingId}
                    onReactivate={onReactivate}
                />
            </td>
        </m.tr>
    );
}

UserRow.displayName = "UserRow";
