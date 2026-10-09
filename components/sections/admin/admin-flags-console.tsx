"use client";

import { Flag } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { FlagDecisionModal } from "@/components/features/admin/flag-decision-modal";
import { FlagReviewPane } from "@/components/features/admin/flag-review-pane";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { ReviewQueue } from "@/components/patterns/review-queue";
import { AdminFlagsHeader } from "@/components/sections/admin/admin-flags-header";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { FLAG_COPY, flagQueueItems, flagReading } from "@/lib/data/admin-flags";
import { useFlagQueue } from "@/lib/hooks/use-flag-queue";

export function AdminFlagsConsole() {
    const queue = useFlagQueue();
    const { active } = queue;

    if (queue.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminFlags}
                onRetry={() => void queue.refetch()}
            />
        );

    if (queue.pending) return <ConsoleSkeleton variant="casework" />;

    return (
        <div className="space-y-4">
            <AdminFlagsHeader
                reading={flagReading(queue.reports)}
                filter={queue.filter}
                counts={queue.counts}
                onFilterChange={queue.changeFilter}
            />

            {active ? (
                <div className="review-split review-split--slim items-start gap-3">
                    <div className="review-rail">
                        <ReviewQueue
                            items={flagQueueItems(
                                queue.visible,
                                queue.filter === "all",
                            )}
                            selectedId={active.id}
                            onSelect={queue.setSelectedId}
                        />
                    </div>
                    <div className="review-pane">
                        <FlagReviewPane
                            report={active}
                            busy={queue.settling}
                            onAction={(mode) =>
                                queue.requestSettle(mode, active.id)
                            }
                        />
                    </div>
                </div>
            ) : (
                <EmptyState
                    icon={Flag}
                    title={FLAG_COPY.emptyTitle}
                    description={FLAG_COPY.emptyLede}
                />
            )}

            <FlagDecisionModal
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
