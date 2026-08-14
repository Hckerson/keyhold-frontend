import { Button } from "@/components/ui/button";
import { AgeMark } from "@/components/features/shared/age-mark";
import { MaintenanceRiskMark } from "@/components/features/admin/maintenance-risk-mark";
import { MAINTENANCE_RISKS } from "@/lib/config/settings-tones";
import { cn } from "@/lib/utils";
import type { MaintenanceOperation } from "@/lib/types";

const LAST_RUN_LABEL = "Last run";

export interface MaintenanceOperationRowProps {
    operation: MaintenanceOperation;
}

export function MaintenanceOperationRow({
    operation,
}: MaintenanceOperationRowProps) {
    const { danger } = MAINTENANCE_RISKS[operation.risk];

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
                        {operation.label}
                    </p>
                    <MaintenanceRiskMark risk={operation.risk} />
                </div>
                <p className="text-text-secondary mt-0.5 truncate text-xs">
                    {operation.caption}
                </p>
                <p className="mt-0.5 flex items-center gap-1">
                    <span className="micro-label">{LAST_RUN_LABEL}</span>
                    <AgeMark
                        minutes={operation.lastRunMinutes}
                        tone="neutral"
                    />
                </p>
            </div>
            <Button
                type="button"
                size="sm"
                variant={danger ? "outline-danger" : "secondary"}
            >
                {operation.action}
            </Button>
        </li>
    );
}

MaintenanceOperationRow.displayName = "MaintenanceOperationRow";
