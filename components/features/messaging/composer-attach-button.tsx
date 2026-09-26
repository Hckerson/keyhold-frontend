"use client";

import { useRef } from "react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MESSAGE_ATTACHMENTS } from "@/lib/config/message-attachments";

const ATTACH_LABEL = "Attach files";

export interface ComposerAttachButtonProps {
    disabled: boolean;
    onPick: (files: File[]) => void;
}

export function ComposerAttachButton({
    disabled,
    onPick,
}: ComposerAttachButtonProps) {
    const fileRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <Button
                emphasis="quiet"
                tone="neutral"
                iconOnly
                type="button"
                aria-label={ATTACH_LABEL}
                disabled={disabled}
                onClick={() => fileRef.current?.click()}
                className="shrink-0"
            >
                <Paperclip
                    className="size-3"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            </Button>
            <input
                ref={fileRef}
                type="file"
                multiple
                accept={MESSAGE_ATTACHMENTS.accept}
                aria-label={ATTACH_LABEL}
                tabIndex={-1}
                className="sr-only"
                onChange={(event) => {
                    onPick(Array.from(event.target.files ?? []));
                    event.target.value = "";
                }}
            />
        </>
    );
}

ComposerAttachButton.displayName = "ComposerAttachButton";
