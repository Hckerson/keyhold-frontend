import { ToneReading } from "@/components/patterns/tone-reading";
import { complianceTone } from "@/lib/config/moderation-tones";

const CLEAR_LABEL = "compliance clear";

export interface ComplianceMarkProps {
    score: number;
    label: string;
    className?: string;
}

export function ComplianceMark({
    score,
    label,
    className,
}: ComplianceMarkProps) {
    return (
        <ToneReading
            value={`${score}%`}
            tone={complianceTone(score)}
            label={`${label} ${score}% ${CLEAR_LABEL}`}
            className={className}
        />
    );
}

ComplianceMark.displayName = "ComplianceMark";
