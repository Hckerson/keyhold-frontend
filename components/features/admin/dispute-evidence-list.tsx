import {
    ArrowUpRight,
    FileText,
    Image,
    MessageSquare,
    type LucideIcon,
} from "lucide-react";
import { DISPUTE_COPY } from "@/lib/data/admin-disputes";
import { formatDayAndMonth } from "@/lib/utils";
import type { DisputeEvidenceType } from "@/lib/enums/enums";
import type { DisputeEvidenceItem } from "@/lib/types";

const ICONS: Record<DisputeEvidenceType, LucideIcon> = {
    MESSAGE: MessageSquare,
    PHOTO: Image,
    DOCUMENT: FileText,
};

export interface DisputeEvidenceListProps {
    evidence: DisputeEvidenceItem[];
}

export function DisputeEvidenceList({ evidence }: DisputeEvidenceListProps) {
    return (
        <section className="min-w-0">
            <h3 className="micro-label">
                {DISPUTE_COPY.evidenceHeading} · {evidence.length}
            </h3>
            {evidence.length === 0 ? (
                <p className="text-text-muted mt-2 text-xs">
                    {DISPUTE_COPY.noEvidence}
                </p>
            ) : (
                <ul className="divide-border-light mt-1 divide-y">
                    {evidence.map((item) => {
                        const Icon = ICONS[item.type];
                        return (
                            <li
                                key={item.id}
                                className="flex items-start gap-3 py-2.5 text-xs"
                            >
                                <Icon
                                    size={14}
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                    className="text-text-muted mt-0.5 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-text truncate">
                                        {item.label}
                                    </p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-text-secondary hover:text-accent ease-smooth mt-0.5 inline-flex max-w-full items-center gap-1 transition-colors duration-200"
                                        >
                                            <span className="truncate">
                                                {item.text}
                                            </span>
                                            <ArrowUpRight
                                                size={12}
                                                strokeWidth={1.5}
                                                aria-hidden="true"
                                                className="shrink-0"
                                            />
                                        </a>
                                    ) : (
                                        <p className="text-text-secondary mt-0.5 leading-relaxed">
                                            {item.text}
                                        </p>
                                    )}
                                </div>
                                <span className="text-text-muted shrink-0 tabular-nums">
                                    {formatDayAndMonth(new Date(item.addedAt))}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}

DisputeEvidenceList.displayName = "DisputeEvidenceList";
