"use client";

import { Wallet } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { UserConcentrationStatement } from "@/components/features/admin/user-concentration-statement";
import { UserLeaderRow } from "@/components/features/admin/user-leader-row";
import { LEADER_COUNT } from "@/lib/data/admin-users-pulse";
import type { LeaderConcentration, ManagedUser } from "@/lib/types";

const TITLE = "Top of the Book";
const LEDE = "Accounts carrying the most lifetime volume";
const EMPTY_TITLE = "No volume yet";
const EMPTY_LEDE = "Accounts rank here once a deal settles.";
const LIST_LABEL = "Accounts ranked by lifetime volume";

export interface AdminUsersBookProps {
    leaders: ManagedUser[];
    concentration: LeaderConcentration;
    directoryVolume: number;
    pending?: boolean;
    onOpen: (id: string) => void;
}

export function AdminUsersBook({
    leaders,
    concentration,
    directoryVolume,
    pending,
    onOpen,
}: AdminUsersBookProps) {
    return (
        <Panel title={TITLE} description={LEDE}>
            {leaders.length > 0 ? (
                <>
                    <ol
                        aria-label={LIST_LABEL}
                        className="divide-border-light divide-y"
                    >
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
                    <UserConcentrationStatement concentration={concentration} />
                </>
            ) : pending ? (
                <SkeletonRows rows={LEADER_COUNT} tall />
            ) : (
                <EmptyState
                    icon={Wallet}
                    title={EMPTY_TITLE}
                    description={EMPTY_LEDE}
                />
            )}
        </Panel>
    );
}

AdminUsersBook.displayName = "AdminUsersBook";
