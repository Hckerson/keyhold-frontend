"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { FilterPills } from "@/components/patterns/filter-pills";
import { VerificationDecisionModal } from "@/components/features/admin/verification-decision-modal";
import { VerificationQueueRail } from "@/components/features/admin/verification-queue-rail";
import { VerificationReviewPane } from "@/components/features/admin/verification-review-pane";
import {
    DECISION_RESULT,
    INITIAL_REQUESTS,
    VERIFICATION_FILTERS,
    type VerificationActionMode,
    type VerificationDecision,
    type VerificationFilterKey,
    type VerificationRequest,
    type VerificationStatus,
} from "@/lib/data/admin-verifications";

export function AdminVerificationConsole() {
    const [items, setItems] = useState<VerificationRequest[]>(INITIAL_REQUESTS);
    const [filter, setFilter] = useState<VerificationFilterKey>("all");
    const [selectedId, setSelectedId] = useState<string | null>(
        INITIAL_REQUESTS[0]?.id ?? null,
    );
    const [decision, setDecision] = useState<VerificationDecision | null>(null);
    const [note, setNote] = useState("");

    const counts = useMemo(() => {
        const base: Record<VerificationFilterKey, number> = {
            all: items.length,
            pending: 0,
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

    const active =
        visible.find((item) => item.id === selectedId) ?? visible[0] ?? null;

    const settle = (
        id: string,
        status: VerificationStatus,
        resolution?: { note: string; kind: VerificationDecision["mode"] },
    ) => {
        setItems((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status,
                          note: resolution?.note,
                          noteKind: resolution?.kind,
                      }
                    : item,
            ),
        );
    };

    const runAction = (mode: VerificationActionMode, id: string) => {
        if (mode === "approve") {
            settle(id, "approved");
            return;
        }
        if (mode === "resubmit") {
            settle(id, "pending");
            return;
        }
        setDecision({ mode, id });
        setNote("");
    };

    const closeDecision = () => {
        setDecision(null);
        setNote("");
    };

    const submitDecision = () => {
        const trimmed = note.trim();
        if (!decision || !trimmed) return;
        settle(decision.id, DECISION_RESULT[decision.mode], {
            note: trimmed,
            kind: decision.mode,
        });
        closeDecision();
    };

    const changeFilter = (key: VerificationFilterKey) => {
        setFilter(key);
        setDecision(null);
    };

    return (
        <div className="space-y-3">
            <PageHeader
                title="Tier Verifications"
                description={`${counts.pending} pending · ${counts.approved} approved · ${counts.rejected} rejected`}
            />

            <FilterPills
                filters={VERIFICATION_FILTERS}
                active={filter}
                onChange={changeFilter}
                counts={counts}
            />

            <div className="grid items-start gap-3 lg:grid-cols-[20rem_minmax(0,1fr)]">
                <div className="lg:sticky lg:top-0">
                    <VerificationQueueRail
                        requests={visible}
                        selectedId={active?.id ?? null}
                        onSelect={setSelectedId}
                    />
                </div>

                {active ? (
                    <VerificationReviewPane
                        request={active}
                        onAction={(mode) => runAction(mode, active.id)}
                    />
                ) : (
                    <EmptyState
                        icon={ShieldCheck}
                        title="Queue clear"
                        description="No verification requests match this filter."
                    />
                )}
            </div>

            <VerificationDecisionModal
                decision={decision}
                applicantName={
                    items.find((item) => item.id === decision?.id)?.name ?? ""
                }
                note={note}
                onNoteChange={setNote}
                onClose={closeDecision}
                onSubmit={submitDecision}
            />
        </div>
    );
}

AdminVerificationConsole.displayName = "AdminVerificationConsole";
