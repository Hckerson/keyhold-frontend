"use client";

import { PrivacyControlRow } from "@/components/features/dashboard/privacy-control-row";
import type { PrivacyControl } from "@/lib/types";

export interface PrivacyControlListProps<K extends string> {
    controls: readonly PrivacyControl<K>[];
    state: Record<K, boolean>;
    onToggle: (id: K) => void;
}

export function PrivacyControlList<K extends string>({
    controls,
    state,
    onToggle,
}: PrivacyControlListProps<K>) {
    return (
        <ul className="divide-border divide-y">
            {controls.map((control) => (
                <PrivacyControlRow
                    key={control.id}
                    control={control}
                    shared={state[control.id]}
                    onToggle={onToggle}
                />
            ))}
        </ul>
    );
}

PrivacyControlList.displayName = "PrivacyControlList";
