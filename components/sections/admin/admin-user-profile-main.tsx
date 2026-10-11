"use client";

import { useRouter } from "next/navigation";
import { Callout } from "@/components/ui/callout";
import { Panel } from "@/components/ui/panel";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { DealLedgerList } from "@/components/features/admin/deal-ledger-list";
import { UserActivityList } from "@/components/features/admin/user-activity-list";
import { UserRecordBand } from "@/components/features/admin/user-record-band";
import { ADMIN_ROUTES } from "@/lib/constants";
import { ledgerTotals } from "@/lib/data/admin-transactions";
import { PROFILE_COPY as COPY } from "@/lib/data/admin-user-profile";
import type {
    AuditEvent,
    LedgerTransaction,
    ProfileNotice,
    ProfileRecordCell,
} from "@/lib/types";

export interface AdminUserProfileMainProps {
    record: ProfileRecordCell[];
    notice: ProfileNotice | null;
    subject: string;
    deals: LedgerTransaction[];
    events: AuditEvent[];
    dealsPending?: boolean;
    dealsFailed?: boolean;
    eventsPending?: boolean;
    eventsFailed?: boolean;
}

export function AdminUserProfileMain({
    record,
    notice,
    subject,
    deals,
    events,
    dealsPending,
    dealsFailed,
    eventsPending,
    eventsFailed,
}: AdminUserProfileMainProps) {
    const router = useRouter();

    return (
        <div className="console-span-2 flex min-w-0 flex-col gap-3">
            {notice && (
                <Callout
                    variant={notice.tone}
                    title={notice.title}
                    description={notice.description}
                />
            )}
            <UserRecordBand cells={record} />

            <Panel
                title={COPY.deals}
                description={COPY.dealsLede}
                count={dealsPending || dealsFailed ? undefined : deals.length}
            >
                {dealsPending ? (
                    <SkeletonRows />
                ) : dealsFailed ? (
                    <p className="text-text-muted text-xs">
                        {COPY.dealsUnavailable}
                    </p>
                ) : deals.length > 0 ? (
                    <DealLedgerList
                        transactions={deals}
                        totals={ledgerTotals(deals)}
                        onOpen={() => router.push(ADMIN_ROUTES.transactions)}
                        subject={subject}
                    />
                ) : (
                    <p className="text-text-muted text-xs">{COPY.dealsEmpty}</p>
                )}
            </Panel>

            <Panel title={COPY.activity} description={COPY.activityLede}>
                {eventsPending ? (
                    <SkeletonRows />
                ) : eventsFailed ? (
                    <p className="text-text-muted text-xs">
                        {COPY.activityUnavailable}
                    </p>
                ) : events.length > 0 ? (
                    <UserActivityList events={events} />
                ) : (
                    <p className="text-text-muted text-xs">
                        {COPY.activityEmpty}
                    </p>
                )}
            </Panel>
        </div>
    );
}

AdminUserProfileMain.displayName = "AdminUserProfileMain";
