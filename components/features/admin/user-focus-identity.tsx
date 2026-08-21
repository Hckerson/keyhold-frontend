import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/patterns/status-dot";
import { USER_STATUSES } from "@/lib/config/user-tones";
import { isAtRisk, joinedLabel, userNote } from "@/lib/data/admin-users";
import { formatCompactUsd, initialsOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

const ATTENTION_EYEBROW = "Needs attention";
const LEADING_EYEBROW = "Leading account";
const NO_VOLUME = "None";
const VOLUME_LABEL = "Lifetime volume";
const JOINED_PREFIX = "Joined";

export interface UserFocusIdentityProps {
    user: ManagedUser;
}

export function UserFocusIdentity({ user }: UserFocusIdentityProps) {
    const status = USER_STATUSES[user.status];
    const note = userNote(user);

    return (
        <div className="flex min-w-0 items-start gap-3">
            <Avatar
                size="md"
                tone="accent"
                elevated={false}
                initials={initialsOf(user.name)}
            />
            <div className="min-w-0">
                <p className="micro-label">
                    {isAtRisk(user) ? ATTENTION_EYEBROW : LEADING_EYEBROW} ·{" "}
                    {status.label} · {JOINED_PREFIX} {joinedLabel(user)}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-h4 font-display text-text font-light tabular-nums">
                        {user.volume > 0
                            ? formatCompactUsd(user.volume)
                            : NO_VOLUME}
                    </p>
                    <span className="micro-label">{VOLUME_LABEL}</span>
                </div>
                <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                    <span className="text-text truncate text-xs font-semibold">
                        {user.name}
                    </span>
                    <StatusDot tone={status.tone} />
                    <span className="text-text-secondary min-w-0 truncate text-xs">
                        {user.email}
                    </span>
                </p>
                {note && (
                    <p className="text-text-secondary mt-1.5 line-clamp-2 text-xs">
                        {note}
                    </p>
                )}
            </div>
        </div>
    );
}

UserFocusIdentity.displayName = "UserFocusIdentity";
