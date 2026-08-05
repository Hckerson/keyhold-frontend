import { AgeMark } from "@/components/features/admin/age-mark";
import { ConfigActorMark } from "@/components/features/admin/config-actor-mark";
import { ConfigValueMark } from "@/components/features/admin/config-value-mark";
import type { ConfigChange } from "@/lib/types";

export interface ConfigChangeRowProps {
    change: ConfigChange;
}

export function ConfigChangeRow({ change }: ConfigChangeRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <span className="block min-w-0">
                    <span className="text-text block truncate text-xs font-medium">
                        {change.field}
                    </span>
                    <ConfigActorMark change={change} />
                </span>
            </td>
            <td className="py-0 pl-3">
                <ConfigValueMark from={change.from} to={change.to} />
            </td>
            <td className="py-0 pl-3 text-right">
                <AgeMark minutes={change.ageMinutes} tone="neutral" />
            </td>
        </tr>
    );
}

ConfigChangeRow.displayName = "ConfigChangeRow";
