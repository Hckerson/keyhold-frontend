"use client";

import { Wallet } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { UserLeaderRow } from "@/components/features/admin/user-leader-row";
import { UserRecencyGrid } from "@/components/features/admin/user-recency-grid";
import type { ManagedUser, UserRecencyBand } from "@/lib/types";

const LEADERS_TITLE = "Top of the Book";
const LEADERS_LEDE = "Accounts carrying the most lifetime volume";
const LEADERS_EMPTY = "No volume yet";
const LEADERS_EMPTY_LEDE = "Accounts rank here once a deal settles.";
const RECENCY_TITLE = "Sign-in Recency";
const RECENCY_LEDE = "How recently live accounts last signed in";

export interface AdminUsersRailProps {
    leaders: ManagedUser[];
    recency: UserRecencyBand[];
    directoryVolume: number;
    onOpen: (id: string) => void;
}

export function AdminUsersRail({
    leaders,
    recency,
    directoryVolume,
    onOpen,
}: AdminUsersRailProps) {
    return (
        <div className="console-rail flex min-w-0 flex-col gap-3 self-start">
            <Panel title={LEADERS_TITLE} description={LEADERS_LEDE}>
                {leaders.length > 0 ? (
                    <ol className="-mx-2 flex flex-col">
                        {leaders.map((user, index) => (
                            <UserLeaderRow
                                key={user.id}
                                user={user}
                                rank={index + 1}
                                directoryVolume={directoryVolume}
                                onOpen={onOpen}
                            />
                        ))}
                    </ol>
                ) : (
                    <EmptyState
                        icon={Wallet}
                        title={LEADERS_EMPTY}
                        description={LEADERS_EMPTY_LEDE}
                    />
                )}
            </Panel>
            <Panel title={RECENCY_TITLE} description={RECENCY_LEDE}>
                <UserRecencyGrid bands={recency} />
            </Panel>
        </div>
    );
}

AdminUsersRail.displayName = "AdminUsersRail";
