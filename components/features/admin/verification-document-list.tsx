import {
    documentMeta,
    type VerificationDocument,
} from "@/lib/data/admin-verifications";
import { cn } from "@/lib/utils";

export interface VerificationDocumentListProps {
    documents: VerificationDocument[];
}

export function VerificationDocumentList({
    documents,
}: VerificationDocumentListProps) {
    return (
        <ul className="divide-border divide-y">
            {documents.map((document) => {
                const meta = documentMeta[document.state];
                const Icon = meta.icon;
                return (
                    <li
                        key={document.label}
                        className="flex items-start gap-2 py-2"
                    >
                        <Icon
                            size={12}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className={cn("mt-0.5 shrink-0", meta.cls)}
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-text truncate text-xs font-medium">
                                {document.label}
                            </p>
                            <p className="text-text-muted text-xs">
                                {document.detail}
                            </p>
                        </div>
                        <span
                            className={cn(
                                "shrink-0 font-mono text-[10px] tracking-wide uppercase",
                                meta.cls,
                            )}
                        >
                            {meta.label}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}

VerificationDocumentList.displayName = "VerificationDocumentList";
