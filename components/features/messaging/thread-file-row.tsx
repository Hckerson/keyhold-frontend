import { Paperclip } from "lucide-react";
import { fileExtension } from "@/lib/data/messages";

export interface ThreadFileRowProps {
    name: string;
}

export function ThreadFileRow({ name }: ThreadFileRowProps) {
    return (
        <li className="flex h-9 items-center gap-2">
            <Paperclip
                className="text-text-muted size-3 shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
            />
            <span className="text-text min-w-0 flex-1 truncate text-xs">
                {name}
            </span>
            <span className="micro-label shrink-0">{fileExtension(name)}</span>
        </li>
    );
}

ThreadFileRow.displayName = "ThreadFileRow";
