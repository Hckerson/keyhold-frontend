"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MetricCell } from "@/components/patterns/metric-cell";
import { ShareMeter } from "@/components/patterns/share-meter";
import { StatusDot } from "@/components/patterns/status-dot";
import { UserActivityMark } from "@/components/features/admin/user-activity-mark";
import { UserDealMark } from "@/components/features/admin/user-deal-mark";
import { UserRoleMark } from "@/components/features/admin/user-role-mark";
import { UserTierMark } from "@/components/features/admin/user-tier-mark";
import { USER_STATUSES, volumeTone } from "@/lib/config/user-tones";
import {
    idleDays,
    isAtRisk,
    joinedLabel,
    userNote,
} from "@/lib/data/admin-users";
import { formatCompactUsd, initialsOf, percentOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

const ATTENTION_EYEBROW = "Needs attention";
const LEADING_EYEBROW = "Leading account";
const NO_VOLUME = "None";
const VOLUME_LABEL = "Lifetime volume";
const JOINED_PREFIX = "Joined";
const STANDING_LABEL = "Standing";
const DEALS_LABEL = "Closed deals";
const SHARE_LABEL = "Share of book";
const ACTIVE_LABEL = "Last sign-in";
const SHARE_NOUN = "of directory volume";
const REVIEW_ACTION = "Review";
const SUSPEND_ACTION = "Suspend";
const REACTIVATE_ACTION = "Reactivate";

export interface AdminUsersFocusHeroProps {
    user: ManagedUser;
    directoryVolume: number;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    onReactivate: (id: string) => void;
}

export function AdminUsersFocusHero({
    user,
    directoryVolume,
    onOpen,
    onSuspend,
    onReactivate,
}: AdminUsersFocusHeroProps) {
    const status = USER_STATUSES[user.status];
    const note = userNote(user);
    const share = percentOf(user.volume, directoryVolume);

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <Avatar
                        size="md"
                        tone="accent"
                        elevated={false}
                        initials={initialsOf(user.name)}
                    />
                    <div className="min-w-0">
                        <p className="micro-label truncate">
                            {isAtRisk(user)
                                ? ATTENTION_EYEBROW
                                : LEADING_EYEBROW}{" "}
                            · {status.label} · {JOINED_PREFIX}{" "}
                            {joinedLabel(user)}
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

                <div className="flex shrink-0 items-center gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => onOpen(user.id)}
                    >
                        {REVIEW_ACTION}
                    </Button>
                    {user.status === "suspended" ? (
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => onReactivate(user.id)}
                        >
                            {REACTIVATE_ACTION}
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onSuspend(user.id)}
                        >
                            {SUSPEND_ACTION}
                        </Button>
                    )}
                </div>
            </div>

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
        </section>
    );
}

AdminUsersFocusHero.displayName = "AdminUsersFocusHero";
