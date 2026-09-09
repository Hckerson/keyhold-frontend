"use client";

import { ToggleRow } from "@/components/ui/forms/toggle-row";
import {
    CONTINGENCIES_META,
    CONTINGENCY_KEYS,
} from "@/lib/config/contingency-tones";
import type { Contingency } from "@/lib/enums/enums";

export interface OfferContingencyListProps {
    selected: Contingency[];
    onToggle: (id: Contingency) => void;
}

export function OfferContingencyList({
    selected,
    onToggle,
}: OfferContingencyListProps) {
    return (
        <div className="flex flex-col gap-2">
            {CONTINGENCY_KEYS.map((id) => (
                <ToggleRow
                    key={id}
                    title={CONTINGENCIES_META[id].label}
                    description={CONTINGENCIES_META[id].caption}
                    checked={selected.includes(id)}
                    onCheckedChange={() => onToggle(id)}
                />
            ))}
        </div>
    );
}

OfferContingencyList.displayName = "OfferContingencyList";
