"use client";

import { Flag } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PortalHeader } from "@/components/patterns/portal-header";
import { FilterPills } from "@/components/patterns/filter-pills";
import { AbuseReportDecisionModal } from "@/components/features/admin/abuse-report-decision-modal";
import { AbuseReportPane } from "@/components/features/admin/abuse-report-pane";
import { AbuseReportRail } from "@/components/features/admin/abuse-report-rail";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { ABUSE_FILTERS } from "@/lib/data/admin-flags";
import { useFlagQueue } from "@/lib/hooks/use-flag-queue";

const TITLE = "Reported Members & Messages";
const EMPTY_TITLE = "Nothing reported";
const EMPTY_LEDE = "No member or message reports match this filter.";

export function AdminFlagsConsole() {
    const queue = useFlagQueue();
    const { counts, active } = queue;

    if (queue.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminFlags}
                onRetry={() => void queue.refetch()}
            />
        );

    if (queue.pending) return <ConsoleSkeleton variant="review" />;

    return (
        <div className="space-y-3">
            <PortalHeader
                title={TITLE}
                lede={`${counts.USER} member · ${counts.MESSAGE} message reports awaiting a decision`}
            />

            <FilterPills
                filters={ABUSE_FILTERS}
                active={queue.filter}
                onChange={queue.changeFilter}
                counts={counts}
            />

            <div className="review-split items-start gap-3">
                <div className="review-rail">
                    <AbuseReportRail
                        reports={queue.visible}
                        selectedId={active?.id ?? null}
                        onSelect={queue.setSelectedId}
                    />
                </div>

                {active ? (
                    <AbuseReportPane
                        report={active}
                        pending={queue.settling}
                        onAction={(mode) =>
                            queue.requestSettle(mode, active.id)
                        }
                    />
                ) : (
                    <EmptyState
                        icon={Flag}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </div>

            <AbuseReportDecisionModal
                mode={queue.decision?.mode}
                report={queue.deciding}
                pending={queue.settling}
                failed={queue.settleFailed}
                onClose={queue.dismissSettle}
                onConfirm={queue.confirmSettle}
            />
        </div>
    );
}

AdminFlagsConsole.displayName = "AdminFlagsConsole";
