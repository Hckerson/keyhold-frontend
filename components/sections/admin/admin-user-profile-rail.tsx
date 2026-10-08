import { ShieldAlert, ShieldCheck } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { UserSuspensionList } from "@/components/features/admin/user-suspension-list";
import { UserTrustList } from "@/components/features/admin/user-trust-list";
import { PROFILE_COPY as COPY } from "@/lib/data/admin-user-profile";
import type { ProfileCheck, ProfileDetail } from "@/lib/types";
import type { Suspension } from "@/lib/validations/suspension";

const VERIFIED_SUFFIX = "verified";
const OF = "of";
const RESTRICTION_ROWS = 1;

export interface AdminUserProfileRailProps {
    checks: ProfileCheck[];
    bio?: string | null;
    details: ProfileDetail[];
    suspensions: Suspension[];
    suspended: boolean;
    pending?: boolean;
    failed?: boolean;
}

export function AdminUserProfileRail({
    checks,
    bio,
    details,
    suspensions,
    suspended,
    pending,
    failed,
}: AdminUserProfileRailProps) {
    const verified = checks.filter((check) => check.verified).length;

    return (
        <div className="console-rail flex min-w-0 flex-col gap-3 self-start">
            <Panel
                title={COPY.trust}
                description={`${verified} ${OF} ${checks.length} ${VERIFIED_SUFFIX}`}
            >
                <UserTrustList checks={checks} />
            </Panel>

            {(bio || details.length > 0) && (
                <Panel title={COPY.about}>
                    <div className="flex flex-col gap-3">
                        {bio && (
                            <p className="text-text-secondary line-clamp-3 text-xs leading-relaxed">
                                {bio}
                            </p>
                        )}
                        {details.length > 0 && (
                            <dl className="divide-border-light divide-y text-xs">
                                {details.map((detail) => (
                                    <div
                                        key={detail.id}
                                        className="flex h-9 items-center justify-between gap-3"
                                    >
                                        <dt className="text-text-secondary">
                                            {detail.label}
                                        </dt>
                                        <dd className="text-text truncate font-medium">
                                            {detail.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </div>
                </Panel>
            )}

            <Panel
                title={COPY.restrictions}
                count={suspensions.length || undefined}
            >
                {pending ? (
                    <SkeletonRows rows={RESTRICTION_ROWS} />
                ) : failed ? (
                    <p className="text-text-muted text-xs">
                        {COPY.restrictionsUnavailable}
                    </p>
                ) : suspensions.length > 0 ? (
                    <UserSuspensionList suspensions={suspensions} />
                ) : suspended ? (
                    <p className="text-error flex items-center gap-2 text-xs">
                        <ShieldAlert
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className="size-3.5"
                        />
                        {COPY.suspendedUnrecorded}
                    </p>
                ) : (
                    <p className="text-text-secondary flex items-center gap-2 text-xs">
                        <ShieldCheck
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className="text-accent size-3.5"
                        />
                        {COPY.neverSuspended}
                    </p>
                )}
            </Panel>
        </div>
    );
}

AdminUserProfileRail.displayName = "AdminUserProfileRail";
