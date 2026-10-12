import { formatAge } from "@/lib/utils";
import type { SettingChange } from "@/lib/types";

export interface SettingChangeListProps {
    changes: SettingChange[];
}

export function SettingChangeList({ changes }: SettingChangeListProps) {
    return (
        <ul className="divide-border-light divide-y">
            {changes.map((change) => (
                <li
                    key={change.key}
                    className="flex items-baseline justify-between gap-4 py-2.5 text-xs"
                >
                    <div className="min-w-0">
                        <p className="text-text truncate">{change.label}</p>
                        <p className="text-text-muted mt-0.5 truncate">
                            {change.editor} · {formatAge(change.ageMinutes)} ago
                        </p>
                    </div>
                    <span className="text-text shrink-0 tabular-nums">
                        {change.value}
                    </span>
                </li>
            ))}
        </ul>
    );
}

SettingChangeList.displayName = "SettingChangeList";
