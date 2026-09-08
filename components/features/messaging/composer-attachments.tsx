"use client";

import { X } from "lucide-react";
import { documentKindOf } from "@/lib/config/conversation-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { formatBytes } from "@/lib/data/file-upload";
import { cn } from "@/lib/utils";

const REMOVE_LABEL = "Remove";

export interface ComposerAttachmentsProps {
    files: File[];
    onRemove: (index: number) => void;
}

export function ComposerAttachments({
    files,
    onRemove,
}: ComposerAttachmentsProps) {
    if (files.length === 0) return null;

    return (
        <ul className="flex flex-wrap gap-1.5">
            {files.map((file, index) => {
                const kind = documentKindOf(file.type);
                const Icon = kind.icon;

                return (
                    <li
                        key={`${file.name}-${file.lastModified}`}
                        className="bg-background-alt border-border-light flex h-7 items-center gap-1.5 rounded-md border px-1.5"
                    >
                        <span
                            className={cn(
                                "grid size-4 shrink-0 place-items-center rounded-xs",
                                chartToneSoft[kind.tone],
                            )}
                        >
                            <Icon
                                className="size-3"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                        </span>
                        <span className="text-text max-w-32 truncate text-xs">
                            {file.name}
                        </span>
                        <span className="micro-label tabular-nums">
                            {formatBytes(file.size)}
                        </span>
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            aria-label={`${REMOVE_LABEL} ${file.name}`}
                            className="text-text-muted hover:text-error focus-visible:ring-accent ease-smooth rounded-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
                        >
                            <X
                                className="size-3"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

ComposerAttachments.displayName = "ComposerAttachments";
