"use client";

import {
    useId,
    useRef,
    useState,
    type DragEvent,
    type KeyboardEvent,
} from "react";
import { UploadCloud } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { FieldShell, errorIdFor } from "@/components/ui/forms/field-shell";
import { formatBytes, screenFiles } from "@/lib/data/file-upload";
import { cn } from "@/lib/utils";

const ACTIVATION_KEYS = ["Enter", " "];
const PROMPT = "Drop files here, or choose from your device";
const BROWSE = "Choose files";
const PROGRESS_LABEL = "Upload progress";

export interface FileUploadProps {
    label: string;
    onFiles: (files: File[]) => void;
    accept?: string;
    maxSize?: number;
    multiple?: boolean;
    hint?: string;
    error?: string;
    progress?: number;
    disabled?: boolean;
    id?: string;
    className?: string;
}

export function FileUpload({
    label,
    onFiles,
    accept,
    maxSize,
    multiple = false,
    hint,
    error,
    progress,
    disabled,
    id,
    className,
}: FileUploadProps) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const inputRef = useRef<HTMLInputElement>(null);
    const [over, setOver] = useState(false);
    const [rejected, setRejected] = useState<string[]>([]);

    const constraints = [
        accept && accept.replaceAll(",", ", "),
        maxSize !== undefined && `up to ${formatBytes(maxSize)}`,
    ]
        .filter(Boolean)
        .join(" · ");

    const take = (incoming: File[]) => {
        const files = multiple ? incoming : incoming.slice(0, 1);
        const screening = screenFiles(files, accept, maxSize);
        setRejected(screening.rejected);
        if (screening.accepted.length > 0) onFiles(screening.accepted);
    };

    const open = () => {
        if (!disabled) inputRef.current?.click();
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOver(false);
        if (disabled) return;
        take(Array.from(event.dataTransfer.files));
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!disabled) setOver(true);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!ACTIVATION_KEYS.includes(event.key)) return;
        event.preventDefault();
        open();
    };

    const message = error ?? rejected[0];

    return (
        <FieldShell
            label={label}
            htmlFor={fieldId}
            hint={
                hint ? <span className="micro-label">{hint}</span> : undefined
            }
            error={message}
            className={className}
        >
            <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-describedby={message ? errorIdFor(fieldId) : undefined}
                aria-disabled={disabled || undefined}
                onClick={open}
                onKeyDown={handleKeyDown}
                onDragOver={handleDragOver}
                onDragLeave={() => setOver(false)}
                onDrop={handleDrop}
                className={cn(
                    "ease-smooth focus-visible:ring-accent flex h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                    over
                        ? "border-accent bg-accent-light"
                        : "border-border bg-background-alt hover:border-border-dark",
                    disabled && "pointer-events-none opacity-50",
                )}
            >
                <UploadCloud
                    className="text-text-muted size-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
                <span className="text-text-secondary text-xs">{PROMPT}</span>
                {constraints && (
                    <span className="micro-label">{constraints}</span>
                )}
            </div>

            <input
                ref={inputRef}
                id={fieldId}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                aria-label={BROWSE}
                className="sr-only"
                onChange={(event) => {
                    take(Array.from(event.target.files ?? []));
                    event.target.value = "";
                }}
            />

            {progress !== undefined && (
                <ProgressBar value={progress} label={PROGRESS_LABEL} />
            )}
        </FieldShell>
    );
}

FileUpload.displayName = "FileUpload";
