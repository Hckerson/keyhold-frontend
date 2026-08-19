import { MetricCell } from "@/components/patterns/metric-cell";
import { ShareMeter } from "@/components/patterns/share-meter";
import { UserActivityMark } from "@/components/features/admin/user-activity-mark";
import { UserDealMark } from "@/components/features/admin/user-deal-mark";
import { UserRoleMark } from "@/components/features/admin/user-role-mark";
import { UserTierMark } from "@/components/features/admin/user-tier-mark";
import { volumeTone } from "@/lib/config/user-tones";
import { idleDays } from "@/lib/data/admin-users";
import { percentOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

const STANDING_LABEL = "Standing";
const DEALS_LABEL = "Closed deals";
const SHARE_LABEL = "Share of book";
const ACTIVE_LABEL = "Last sign-in";
const SHARE_NOUN = "of directory volume";

export interface UserFocusMetricsProps {
    user: ManagedUser;
    directoryVolume: number;
}

export function UserFocusMetrics({
    user,
    directoryVolume,
}: UserFocusMetricsProps) {
    const share = percentOf(user.volume, directoryVolume);

    return (
        <div className="bg-background-muted border-border-light mt-3 grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-4">
            <MetricCell label={STANDING_LABEL}>
                <span className="flex min-w-0 items-center gap-1.5">
                    <UserRoleMark role={user.role} />
                    <UserTierMark tier={user.tier} />
                </span>
            </MetricCell>
            <MetricCell label={DEALS_LABEL}>
                <UserDealMark deals={user.transactions} />
            </MetricCell>
            <MetricCell label={SHARE_LABEL}>
                <ShareMeter
                    percent={share}
                    tone={volumeTone(share)}
                    label={`${user.name} holds ${share}% ${SHARE_NOUN}`}
                    className="justify-start"
                />
            </MetricCell>
            <MetricCell label={ACTIVE_LABEL}>
                <UserActivityMark days={idleDays(user)} />
            </MetricCell>
        </div>
    );
}

UserFocusMetrics.displayName = "UserFocusMetrics";
