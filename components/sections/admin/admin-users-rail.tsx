"use client";

import { Panel } from "@/components/ui/panel";
import { UserRecencyList } from "@/components/features/admin/user-recency-list";
import { UserSignupTrend } from "@/components/features/admin/user-signup-trend";
import { AdminUsersBook } from "@/components/sections/admin/admin-users-book";
import type {
    LeaderConcentration,
    ManagedUser,
    UserRecencyBand,
    UserSignupTrend as UserSignupTrendData,
} from "@/lib/types";

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
            <AdminUsersBook
                leaders={leaders}
                concentration={concentration}
                directoryVolume={directoryVolume}
                onOpen={onOpen}
            />
        </div>
    );
}

AdminUsersRail.displayName = "AdminUsersRail";
