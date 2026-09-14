import { DocumentCard } from "@/components/features/messaging/document-card";
import type { ThreadDocument } from "@/lib/types/message";

export interface DocumentListProps {
    documents: ThreadDocument[];
}

export function DocumentList({ documents }: DocumentListProps) {
    return (
        <ul className="divide-border divide-y">
            {documents.map((document) => (
                <li key={document.id}>
                    <DocumentCard document={document} />
                </li>
            ))}
        </ul>
    );
}

DocumentList.displayName = "DocumentList";
