import { SecurityControlRow } from "@/components/features/shared/security-control-row";
import type { SecurityControl } from "@/lib/types";

export interface SecurityControlListProps<K extends string> {
    controls: readonly SecurityControl<K>[];
    onAction?: (id: K) => void;
}

export function SecurityControlList<K extends string>({
    controls,
    onAction,
}: SecurityControlListProps<K>) {
    return (
        <ul className="mt-2.5 space-y-2">
            {controls.map((control) => (
                <SecurityControlRow
                    key={control.id}
                    control={control}
                    onAction={onAction}
                />
            ))}
        </ul>
    );
}

SecurityControlList.displayName = "SecurityControlList";
