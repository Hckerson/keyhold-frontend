import { IconChip } from "@/components/ui/icon-chip";
import { ComplianceCheckMark } from "@/components/features/admin/compliance-check-mark";
import {
    CHECK_STATES,
    COMPLIANCE_CHECK_KEYS,
} from "@/lib/config/compliance-checks";
import { CHECK_COUNT_LABEL } from "@/lib/data/admin-listings";
import type { ComplianceReport } from "@/lib/types";

const ALL_CLEAR = `All ${CHECK_COUNT_LABEL} clear`;

export interface ComplianceCheckListProps {
    compliance: ComplianceReport;
    openOnly?: boolean;
}

export function ComplianceCheckList({
    compliance,
    openOnly,
}: ComplianceCheckListProps) {
    const shown = COMPLIANCE_CHECK_KEYS.filter(
        (id) => !openOnly || compliance[id] !== "pass",
    );

    if (shown.length === 0)
        return (
            <p className="flex items-center gap-2 text-xs">
                <IconChip
                    icon={CHECK_STATES.pass.icon}
                    tone={CHECK_STATES.pass.tone}
                />
                <span className="text-text-secondary">{ALL_CLEAR}</span>
            </p>
        );

    return (
        <ul className="card-grid gap-1.5">
            {shown.map((id) => (
                <ComplianceCheckMark key={id} id={id} state={compliance[id]} />
            ))}
        </ul>
    );
}

ComplianceCheckList.displayName = "ComplianceCheckList";
