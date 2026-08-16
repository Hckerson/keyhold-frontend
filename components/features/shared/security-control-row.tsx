import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgeMark } from "@/components/features/shared/age-mark";
import {
    NEVER_CHANGED_LABEL,
    SECURITY_STATES,
} from "@/lib/config/account-tones";
import type { SecurityControl } from "@/lib/types";
import { cn } from "@/lib/utils";

const LAST_CHANGED_LABEL = "Last changed";

export interface SecurityControlRowProps<K extends string> {
    control: SecurityControl<K>;
    onAction?: (id: K) => void;
}

export function SecurityControlRow<K extends string>({
    control,
    onAction,
}: SecurityControlRowProps<K>) {
    const { label, tone, danger } = SECURITY_STATES[control.state];

    return (
        <li
            className={cn(
                "flex items-center justify-between gap-3 rounded-lg border p-2.5",
                danger
                    ? "border-error/20 bg-error/5"
                    : "border-border-light bg-background",
            )}
        >
            <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-1.5">
                    <p
                        className={cn(
                            "min-w-0 truncate text-xs font-semibold",
                            danger ? "text-error" : "text-text",
                        )}
                    >
                        {control.label}
                    </p>
                    <StatusBadge tone={tone}>{label}</StatusBadge>
                </div>
                <p className="text-text-secondary mt-0.5 truncate text-xs">
                    {control.caption}
                </p>
                <p className="mt-0.5 flex items-center gap-1">
                    <span className="micro-label">{LAST_CHANGED_LABEL}</span>
                    {control.lastChangedMinutes ? (
                        <AgeMark
                            minutes={control.lastChangedMinutes}
                            tone="neutral"
                        />
                    ) : (
                        <span className="text-text-muted text-xs font-medium">
                            {NEVER_CHANGED_LABEL}
                        </span>
                    )}
                </p>
            </div>
            <Button
                type="button"
                size="sm"
                variant={danger ? "outline-danger" : "secondary"}
                onClick={onAction ? () => onAction(control.id) : undefined}
            >
                {control.action}
            </Button>
        </li>
    );
}

SecurityControlRow.displayName = "SecurityControlRow";
