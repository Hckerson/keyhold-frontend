"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ModerationToolbar } from "@/components/features/admin/moderation-toolbar";
import { ModerationListingList } from "@/components/features/admin/moderation-listing-list";
import { ModerationDecisionModal } from "@/components/features/admin/moderation-decision-modal";
import {
    INITIAL_LISTINGS,
    type Decision,
    type DecisionMode,
    type ModerationFilterKey,
    type ModerationListing,
} from "@/lib/data/admin-listings";

export default function AdminModerationPage() {
    const [items, setItems] = useState<ModerationListing[]>(INITIAL_LISTINGS);
    const [filter, setFilter] = useState<ModerationFilterKey>("all");
    const [selected, setSelected] = useState<string[]>([]);
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

    const toggleOne = (id: string) => {
        setSelected((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
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

            <ModerationToolbar
                filter={filter}
                counts={counts}
                onFilterChange={setFilter}
                visibleIds={visible.map((item) => item.id)}
                selected={selected}
                onSelectedChange={setSelected}
                onApprove={approve}
                onDecision={openDecision}
            />

            <ModerationListingList
                listings={visible}
                selected={selected}
                onToggle={toggleOne}
                onApprove={approve}
                onDecision={openDecision}
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
