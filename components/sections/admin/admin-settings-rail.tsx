"use client";

import { Pager } from "@/components/patterns/pager";
import { PageSwap } from "@/components/patterns/page-swap";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { EmptyState } from "@/components/ui/empty-state";
import { History } from "lucide-react";
import { ConfigChangeTable } from "@/components/features/admin/config-change-table";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import type { ConfigChange } from "@/lib/types";

const CHANGES_TITLE = "Change Log";
const CHANGES_LEDE = "Who moved a setting and what it moved from";
const CHANGES_ACTION = "Reports";
const EMPTY_TITLE = "No changes recorded";
const EMPTY_LEDE = "Audited actions appear here as they happen.";

export interface AdminSettingsRailProps {
    changes: ConfigChange[];
    total: number;
    page: number;
    pageCount: number;
    onPageChange: (next: number) => void;
}

export function AdminSettingsRail({
    changes,
    total,
    page,
    pageCount,
    onPageChange,
}: AdminSettingsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={CHANGES_TITLE}
                description={CHANGES_LEDE}
                count={total}
                action={
                    <PanelLink href="/admin/reports" label={CHANGES_ACTION} />
                }
            >
                {changes.length > 0 ? (
                    <PanelInset scroll className="scroll-y max-h-[30rem]">
                        <PageSwap swapKey={page} className="min-w-fit">
                            <ConfigChangeTable changes={changes} />
                        </PageSwap>
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={History}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}

                {pageCount > 1 && (
                    <Pager
                        currentPage={page}
                        pageCount={pageCount}
                        pageSize={TABLE_PAGE_SIZE}
                        visibleCount={changes.length}
                        totalCount={total}
                        onPageChange={onPageChange}
                        className="border-border-light -mx-4 mt-2.5 border-t px-4 pt-2"
                    />
                )}
            </Panel>
        </div>
    );
}

AdminSettingsRail.displayName = "AdminSettingsRail";
