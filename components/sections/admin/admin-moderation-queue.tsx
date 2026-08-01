"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/patterns/data-table";
import { FilterPills } from "@/components/patterns/filter-pills";
import { buildModerationTableConfig } from "@/components/features/admin/moderation-listing-columns";
import { ModerationDecisionModal } from "@/components/features/admin/moderation-decision-modal";
import {
    INITIAL_LISTINGS,
    MODERATION_FILTERS,
    type Decision,
    type DecisionMode,
    type ModerationFilterKey,
    type ModerationListing,
} from "@/lib/data/admin-listings";

export function AdminModerationQueue() {
    const [items, setItems] = useState<ModerationListing[]>(INITIAL_LISTINGS);
    const [filter, setFilter] = useState<ModerationFilterKey>("all");
    const [selected, setSelected] = useState<string[]>([]);
    const [openId, setOpenId] = useState<string | null>(null);
    const [decision, setDecision] = useState<Decision | null>(null);
    const [note, setNote] = useState("");

    const counts = useMemo(() => {
        const base: Record<ModerationFilterKey, number> = {
            all: items.length,
            pending: 0,
            flagged: 0,
            approved: 0,
            rejected: 0,
        };
        for (const item of items) base[item.status] += 1;
        return base;
    }, [items]);

    const visible = useMemo(
        () =>
            filter === "all"
                ? items
                : items.filter((item) => item.status === filter),
        [items, filter],
    );

    const changeFilter = (key: ModerationFilterKey) => {
        setFilter(key);
        setSelected([]);
        setOpenId(null);
    };

    const approve = (ids: string[]) => {
        setItems((current) =>
            current.map((item) =>
                ids.includes(item.id)
                    ? {
                          ...item,
                          status: "approved",
                          reason: undefined,
                          note: undefined,
                          changesRequested: false,
                      }
                    : item,
            ),
        );
        setSelected((current) => current.filter((id) => !ids.includes(id)));
    };

    const openDecision = (mode: DecisionMode, ids: string[]) => {
        setDecision({ mode, ids });
        setNote("");
    };

    const closeDecision = () => {
        setDecision(null);
        setNote("");
    };

    const submitDecision = () => {
        const trimmed = note.trim();
        if (!decision || !trimmed) return;
        const { mode, ids } = decision;
        setItems((current) =>
            current.map((item) =>
                ids.includes(item.id)
                    ? mode === "reject"
                        ? {
                              ...item,
                              status: "rejected",
                              note: trimmed,
                              changesRequested: false,
                          }
                        : {
                              ...item,
                              status: "pending",
                              note: trimmed,
                              changesRequested: true,
                          }
                    : item,
            ),
        );
        setSelected((current) => current.filter((id) => !ids.includes(id)));
        closeDecision();
    };

    const tableConfig = useMemo(
        () =>
            buildModerationTableConfig({
                onApprove: (id) => {
                    setOpenId(null);
                    approve([id]);
                },
                onDecision: (mode, id) => {
                    setOpenId(null);
                    openDecision(mode, [id]);
                },
            }),
        [],
    );

    return (
        <div className="space-y-3">
            <PageHeader
                title="Listings Moderation"
                description={`${counts.pending} pending · ${counts.flagged} flagged · ${counts.approved} approved · ${counts.rejected} rejected`}
                action={
                    <Button variant="secondary" size="sm">
                        Export
                    </Button>
                }
            />

            <FilterPills
                filters={MODERATION_FILTERS}
                active={filter}
                onChange={changeFilter}
                counts={counts}
            />

            <DataTable
                {...tableConfig}
                data={visible}
                selectedKeys={selected}
                onSelectedKeysChange={setSelected}
                openKey={openId}
                onOpenChange={setOpenId}
                bulkActions={(rows) => {
                    const ids = rows.map((row) => row.id);
                    return (
                        <>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => approve(ids)}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => openDecision("changes", ids)}
                            >
                                Request Changes
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => openDecision("reject", ids)}
                            >
                                Reject
                            </Button>
                        </>
                    );
                }}
            />

            <ModerationDecisionModal
                decision={decision}
                note={note}
                onNoteChange={setNote}
                onClose={closeDecision}
                onSubmit={submitDecision}
            />
        </div>
    );
}

AdminModerationQueue.displayName = "AdminModerationQueue";
