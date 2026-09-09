import { FileText, Image, MessageSquare, type LucideIcon } from "lucide-react";
import type { DisputeEvidenceType } from "@/lib/enums/enums";
import type { DisputeEvidenceItem } from "@/lib/data/admin-disputes";

const EMPTY_LEDE = "Nothing was attached to this dispute.";

const evidenceIcon: Record<DisputeEvidenceType, LucideIcon> = {
    MESSAGE: MessageSquare,
    PHOTO: Image,
    DOCUMENT: FileText,
};

export interface DisputeEvidenceListProps {
    evidence: DisputeEvidenceItem[];
}

export function DisputeEvidenceList({ evidence }: DisputeEvidenceListProps) {
    if (evidence.length === 0)
        return <p className="text-text-muted mt-1.5 text-xs">{EMPTY_LEDE}</p>;

    return (
        <ul className="divide-border-light mt-1.5 divide-y">
            {evidence.map((item) => {
                const Icon = evidenceIcon[item.type];

                return (
                    <li key={item.id} className="flex items-start gap-2 py-2">
                        <Icon
                            className="text-text-muted mt-0.5 size-4 shrink-0"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        <div className="min-w-0">
                            <p className="text-text truncate text-xs font-medium">
                                {item.label}
                            </p>
                            <p className="text-text-secondary mt-0.5 text-xs break-words">
                                {item.content}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

DisputeEvidenceList.displayName = "DisputeEvidenceList";
