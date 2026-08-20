import { ComplianceCheckMark } from "@/components/features/admin/compliance-check-mark";
import { COMPLIANCE_CHECK_KEYS } from "@/lib/config/moderation-tones";
import type { ComplianceReport } from "@/lib/types";

export interface ComplianceCheckListProps {
    compliance: ComplianceReport;
}

export function ComplianceCheckList({ compliance }: ComplianceCheckListProps) {
    return (
        <ul className="card-grid gap-1.5">
            {COMPLIANCE_CHECK_KEYS.map((id) => (
                <ComplianceCheckMark key={id} id={id} state={compliance[id]} />
            ))}
        </ul>
    );
}

ComplianceCheckList.displayName = "ComplianceCheckList";
