"use client";

import { DeltaChip } from "@/components/ui/delta-chip";
import { IconChip } from "@/components/ui/icon-chip";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkline } from "@/components/ui/charts/sparkline";
import { formatCount } from "@/lib/utils";
import type { UserRoleTile, UserSignupTrend } from "@/lib/types";

const BAND_LABEL = "The account base at a glance";
const ACCOUNTS_LABEL = "Accounts";
const ROLES_LABEL = "By role";
const SIGNUPS_LABEL = "New accounts";
const SIGNUPS_SUFFIX = "joined in";
const SPARK_HEIGHT = 40;
const UNKNOWN = "—";

export interface AdminUsersStatBandProps {
    total: number;
    reading: string;
    roles: UserRoleTile[];
    signups: UserSignupTrend;
    pending?: boolean;
}

export function AdminUsersStatBand({
    total,
    reading,
    roles,
    signups,
    pending,
}: AdminUsersStatBandProps) {
    return (
        <section
            aria-label={BAND_LABEL}
            aria-busy={pending || undefined}
            className="console-split border-border bg-background-muted gap-1 rounded-xl border p-1 shadow-sm"
        >
            <div className="bg-background flex flex-col justify-between gap-2 rounded-lg p-3">
                <p className="micro-label">{ACCOUNTS_LABEL}</p>
                {pending ? (
                    <Skeleton className="h-8 w-24" />
                ) : (
                    <p className="font-display text-h4 text-text leading-none font-light tabular-nums">
                        {formatCount(total)}
                    </p>
                )}
                <p className="text-text-secondary truncate text-xs">
                    {pending ? UNKNOWN : reading}
                </p>
            </div>

            <div className="bg-background flex flex-col gap-1 rounded-lg p-3">
                <p className="micro-label">{ROLES_LABEL}</p>
                <ul className="flex flex-col">
                    {roles.map((role) => (
                        <li
                            key={role.id}
                            className="flex h-7 items-center gap-2 text-xs"
                        >
                            <IconChip
                                icon={role.icon}
                                tone={role.count === 0 ? "neutral" : role.tone}
                                className="size-5"
                            />
                            <span className="text-text-secondary min-w-0 flex-1 truncate">
                                {role.label}
                            </span>
                            <span className="text-text font-semibold tabular-nums">
                                {formatCount(role.count)}
                            </span>
                            <span className="text-text-muted w-8 text-right tabular-nums">
                                {role.percent}%
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-background flex flex-col gap-2 rounded-lg p-3">
                <p className="micro-label">{SIGNUPS_LABEL}</p>
                <div className="flex items-baseline gap-2">
                    <span className="font-display text-h5 text-text leading-none font-light tabular-nums">
                        {formatCount(signups.latest)}
                    </span>
                    <span className="text-text-muted text-xs">
                        {SIGNUPS_SUFFIX} {signups.latestLabel}
                    </span>
                    {signups.delta && (
                        <DeltaChip
                            size="sm"
                            value={signups.delta.label}
                            direction={signups.delta.direction}
                            className="ml-auto"
                        />
                    )}
                </div>
                <Sparkline
                    data={signups.months}
                    tone="accent"
                    height={SPARK_HEIGHT}
                />
            </div>
        </section>
    );
}

AdminUsersStatBand.displayName = "AdminUsersStatBand";
