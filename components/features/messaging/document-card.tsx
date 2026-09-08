import { Download } from "lucide-react";
import { documentKindOf } from "@/lib/config/conversation-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { formatBytes } from "@/lib/data/file-upload";
import { cn } from "@/lib/utils";
import type { ThreadDocument } from "@/lib/types/message";

const DOWNLOAD_LABEL = "Download";

export interface DocumentCardProps {
    document: ThreadDocument;
    className?: string;
}

export function DocumentCard({ document, className }: DocumentCardProps) {
    const kind = documentKindOf(document.mimeType);
    const Icon = kind.icon;

    return (
        <a
            href={document.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${DOWNLOAD_LABEL} ${document.filename}`}
            className={cn(
                "group hover:bg-background-alt focus-visible:ring-accent ease-smooth flex h-11 items-center gap-2 rounded-md px-2 transition-colors focus-visible:ring-2 focus-visible:outline-none",
                className,
            )}
        >
            <span
                className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-md",
                    chartToneSoft[kind.tone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1 truncate text-xs">
                <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                    {document.filename}
                </span>
                <span className="text-text-muted">
                    {" · "}
                    {document.sharedBy}
                </span>
            </span>
            <span className="micro-label w-14 shrink-0 text-right tabular-nums">
                {formatBytes(document.sizeBytes)}
            </span>
            <Download
                className="text-text-muted group-hover:text-accent ease-smooth size-3 shrink-0 transition-colors"
                strokeWidth={1.5}
                aria-hidden="true"
            />
        </a>
    );
}

DocumentCard.displayName = "DocumentCard";
