import { SecurityControlRow } from "@/components/features/agent/security-control-row";
import type { SecurityControl } from "@/lib/data/agent-account";

export interface SecurityControlListProps {
    controls: readonly SecurityControl[];
}

export function SecurityControlList({ controls }: SecurityControlListProps) {
    return (
        <ul className="mt-2.5 space-y-2">
            {controls.map((control) => (
                <SecurityControlRow key={control.id} control={control} />
            ))}
        </ul>
    );
}

SecurityControlList.displayName = "SecurityControlList";
