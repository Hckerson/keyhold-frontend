"use client";

import type { ReactNode } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { StatusBadge } from "@/components/ui/status-badge";
import {
    RoleChip,
    TierLabel,
    userStatusMeta,
} from "@/components/features/admin/user-table-cells";
import { formatCompactUsd, formatCount, parseLocalDate } from "@/lib/utils";
import type { ManagedUser, UserStatus } from "@/lib/types";

const DATE_FORMAT = "MMMM d, yyyy";

function DetailRow({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="border-border-light flex items-center justify-between gap-4 border-b py-1.5 last:border-b-0">
            <span className="micro-label">{label}</span>
            <span className="text-text truncate text-xs font-medium">
                {children}
            </span>
        </div>
    );
}

export function UserDetail({ user }: { user: ManagedUser }) {
    const status = userStatusMeta[user.status];

    return (
        <div className="space-y-4">
            <div className="bg-background-alt rounded-lg px-3 py-2.5">
                <p className="micro-label">Lifetime volume</p>
                <p className="font-display text-h6 text-text mt-0.5 font-light tabular-nums">
                    {user.volume > 0 ? formatCompactUsd(user.volume) : "None"}
                </p>
                <p className="text-text-secondary mt-1 text-xs tabular-nums">
                    {formatCount(user.transactions)} closed deal
                    {user.transactions === 1 ? "" : "s"}
                </p>
            </div>

            <div className="flex items-center justify-between gap-3">
                <StatusBadge tone={status.tone} size="md">
                    {status.label}
                </StatusBadge>
                <span className="text-text-muted text-xs tabular-nums">
                    Last active{" "}
                    {format(parseLocalDate(user.lastActive), DATE_FORMAT)}
                </span>
            </div>

            {status.note && (
                <Callout
                    variant={status.tone}
                    title={status.label}
                    description={status.note}
                />
            )}

            <div>
                <p className="micro-label">Account</p>
                <div className="mt-1.5">
                    <DetailRow label="Email">{user.email}</DetailRow>
                    <DetailRow label="Role">
                        <RoleChip role={user.role} />
                    </DetailRow>
                    <DetailRow label="Tier">
                        <TierLabel tier={user.tier} />
                    </DetailRow>
                    <DetailRow label="Joined">
                        {format(parseLocalDate(user.joinDate), DATE_FORMAT)}
                    </DetailRow>
                </div>
            </div>
        </div>
    );
}

export function UserPanelActions({
    user,
    onStatusChange,
}: {
    user: ManagedUser;
    onStatusChange?: (ids: string[], status: UserStatus) => void;
}) {
    return (
        <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm">
                View profile
            </Button>
            {user.status === "suspended" ? (
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onStatusChange?.([user.id], "active")}
                >
                    Reactivate
                </Button>
            ) : (
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onStatusChange?.([user.id], "suspended")}
                >
                    Suspend
                </Button>
            )}
        </div>
    );
}
