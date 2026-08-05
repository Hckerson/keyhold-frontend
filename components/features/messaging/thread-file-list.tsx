import { ThreadFileRow } from "@/components/features/messaging/thread-file-row";

const EMPTY_FILES = "No files shared in this thread yet.";

export interface ThreadFileListProps {
    files: string[];
}

export function ThreadFileList({ files }: ThreadFileListProps) {
    if (files.length === 0) {
        return (
            <p className="text-text-secondary py-3 text-xs">{EMPTY_FILES}</p>
        );
    }

    return (
        <ul className="divide-border divide-y">
            {files.map((file) => (
                <ThreadFileRow key={file} name={file} />
            ))}
        </ul>
    );
}

ThreadFileList.displayName = "ThreadFileList";
