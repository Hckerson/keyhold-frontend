"use client";

import { Wallet } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { UserConcentrationStatement } from "@/components/features/admin/user-concentration-statement";
import { UserLeaderRow } from "@/components/features/admin/user-leader-row";
import { UserRecencyList } from "@/components/features/admin/user-recency-list";
import { UserSignupTrend } from "@/components/features/admin/user-signup-trend";
import type {
    LeaderConcentration,
    ManagedUser,
    UserRecencyBand,
    UserSignupTrend as UserSignupTrendData,
} from "@/lib/types";

const LEADERS_TITLE = "Top of the Book";
const LEADERS_LEDE = "Lifetime volume held by the leading accounts";
const LEADERS_EMPTY = "No volume yet";
const LEADERS_EMPTY_LEDE = "Accounts rank here once a deal settles.";
const SIGNUPS_TITLE = "New Accounts";
const SIGNUPS_LEDE = "Sign-ups in the last complete month";
const RECENCY_TITLE = "Sign-in Recency";
const RECENCY_LEDE = "How recently live accounts last signed in";

export interface AdminUsersRailProps {
    leaders: ManagedUser[];
    concentration: LeaderConcentration;
    recency: UserRecencyBand[];
    signups: UserSignupTrendData;
    directoryVolume: number;
    onOpen: (id: string) => void;
}

export function AdminUsersRail({
    leaders,
    concentration,
    recency,
    signups,
    directoryVolume,
    onOpen,
}: AdminUsersRailProps) {
    return (
        <div className="console-rail flex min-w-0 flex-col gap-3 self-start">
            <Panel title={SIGNUPS_TITLE} description={SIGNUPS_LEDE}>
                <UserSignupTrend signups={signups} />
            </Panel>
            <Panel title={RECENCY_TITLE} description={RECENCY_LEDE}>
                <UserRecencyList bands={recency} />
            </Panel>
            <Panel title={LEADERS_TITLE} description={LEADERS_LEDE}>
                {leaders.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        <UserConcentrationStatement
                            concentration={concentration}
                        />
                        <ol className="divide-border-light -mx-2 flex flex-col divide-y">
                            {leaders.map((user) => (
                                <UserLeaderRow
                                    key={user.id}
                                    user={user}
                                    directoryVolume={directoryVolume}
                                    onOpen={onOpen}
                                />
                            ))}
                        </ol>
                    </div>
                ) : (
                    <EmptyState
                        icon={Wallet}
                        title={LEADERS_EMPTY}
                        description={LEADERS_EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

AdminUsersRail.displayName = "AdminUsersRail";
