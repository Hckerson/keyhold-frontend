"use client";

import { Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/forms/file-upload";
import { initialsOf } from "@/lib/utils";

const PHOTO_LABEL = "Profile Photo";
const PHOTO_ACCEPT = "image/jpeg,image/png,image/webp,image/avif";
const PHOTO_MAX_BYTES = 10 * 1024 * 1024;
const PHOTO_HINT = "At least 400 × 400 pixels";
const REMOVE_LABEL = "Remove";
const PHOTO_ALT = "Profile photo";

export interface ProfilePhotoUploaderProps {
    name: string;
    src?: string;
    uploading?: boolean;
    progress?: number;
    onUpload: (file: File) => void;
    onRemove?: () => void;
}

export function ProfilePhotoUploader({
    name,
    src,
    uploading,
    progress,
    onUpload,
    onRemove,
}: ProfilePhotoUploaderProps) {
    return (
        <div className="border-border-light mb-3 flex flex-wrap items-start gap-3 border-b pb-3">
            <Avatar
                size="xl"
                src={src}
                initials={initialsOf(name)}
                alt={PHOTO_ALT}
            />
            <div className="flex min-w-56 flex-1 flex-col gap-1.5">
                <FileUpload
                    label={PHOTO_LABEL}
                    accept={PHOTO_ACCEPT}
                    maxSize={PHOTO_MAX_BYTES}
                    hint={PHOTO_HINT}
                    disabled={uploading}
                    progress={uploading ? (progress ?? 0) : undefined}
                    onFiles={(files) => onUpload(files[0])}
                />
                {onRemove && (
                    <Button
                        emphasis="quiet"
                        tone="error"
                        type="button"
                        icon={Trash2}
                        disabled={!src || uploading}
                        className="self-start"
                        onClick={onRemove}
                    >
                        {REMOVE_LABEL}
                    </Button>
                )}
            </div>
        </div>
    );
}

ProfilePhotoUploader.displayName = "ProfilePhotoUploader";
