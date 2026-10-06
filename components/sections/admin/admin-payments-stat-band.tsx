"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { EscrowStateCell } from "@/components/features/admin/escrow-state-cell";
import { formatCompactUsd, formatCount } from "@/lib/utils";
import type { PayoutStateFilter } from "@/lib/data/admin-payments";
import type { EscrowPosition, PayoutStage } from "@/lib/types";

const BAND_LABEL = "Escrow position; pick a state to filter the payouts";
const HELD_LABEL = "In escrow";
const HOLDS_NOUN = "holds";
const FEE_SUFFIX = "fee";
const NET_SUFFIX = "owed to agents";
const EVERY_STATE: PayoutStateFilter = "all";

export interface AdminPaymentsStatBandProps {
    position: EscrowPosition;
    stages: PayoutStage[];
    active: PayoutStateFilter;
    pending?: boolean;
    onChange: (next: PayoutStateFilter) => void;
}

export function AdminPaymentsStatBand({
    position,
    stages,
    active,
    pending,
    onChange,
}: AdminPaymentsStatBandProps) {
    return (
        <section
            aria-label={BAND_LABEL}
            aria-busy={pending || undefined}
            className="console-split border-border bg-border gap-px overflow-hidden rounded-xl border shadow-sm"
        >
            <div className="bg-background-muted flex flex-col justify-between gap-3 p-4">
                <p className="micro-label">{HELD_LABEL}</p>
                {pending ? (
                    <Skeleton className="h-8 w-28" />
                ) : (
                    <p className="font-display text-h4 text-text leading-none font-light tabular-nums">
                        {formatCompactUsd(position.held)}
                    </p>
                )}
                <p className="text-text-secondary text-xs tabular-nums">
                    {formatCount(position.holds)} {HOLDS_NOUN} ·{" "}
                    {formatCompactUsd(position.fee)} {FEE_SUFFIX} ·{" "}
                    <span className="text-text font-medium">
                        {formatCompactUsd(position.net)}
                    </span>{" "}
                    {NET_SUFFIX}
                </p>
            </div>
            <div className="console-span-2 bg-border grid grid-cols-2 gap-px">
                {stages.map((stage) => (
                    <EscrowStateCell
                        key={stage.id}
                        stage={stage}
                        active={stage.id === active}
                        pending={pending}
                        onSelect={() =>
                            onChange(
                                stage.id === active ? EVERY_STATE : stage.id,
                            )
                        }
                    />
                ))}
            </div>
        </section>
    );
}

AdminPaymentsStatBand.displayName = "AdminPaymentsStatBand";
