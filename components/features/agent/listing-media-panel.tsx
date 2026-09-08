"use client";

import { ImagePlus } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { EmptyState } from "@/components/ui/empty-state";
import { FileUpload } from "@/components/ui/forms/file-upload";
import { ListingImageCard } from "@/components/features/agent/listing-image-card";
import {
    LISTING_IMAGE_ACCEPT,
    MAX_LISTING_IMAGES,
    MAX_LISTING_IMAGE_BYTES,
} from "@/lib/config/listing-form";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import { movedImageIds } from "@/lib/data/listing-form";
import type { PropertyImage } from "@/lib/validations/property";

export interface ListingMediaPanelProps {
    id: string;
    images: readonly PropertyImage[];
    busy: boolean;
    uploading: boolean;
    uploadProgress?: number;
    onUpload: (files: File[]) => void;
    onReorder: (ids: string[]) => void;
    onRemove: (imageId: string) => void;
}

export function ListingMediaPanel({
    id,
    images,
    busy,
    uploading,
    uploadProgress,
    onUpload,
    onReorder,
    onRemove,
}: ListingMediaPanelProps) {
    const full = images.length >= MAX_LISTING_IMAGES;

    return (
        <Panel
            id={id}
            title={COPY.media}
            description={COPY.mediaLede}
            count={`${images.length}/${MAX_LISTING_IMAGES}`}
            countQuiet
        >
            {images.length > 0 ? (
                <div className="card-grid gap-2">
                    {images.map((image, index) => (
                        <ListingImageCard
                            key={image.id}
                            image={image}
                            index={index}
                            total={images.length}
                            busy={busy}
                            onMove={(to) =>
                                onReorder(movedImageIds(images, index, to))
                            }
                            onRemove={() => onRemove(image.id)}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={ImagePlus}
                    title={COPY.noImages}
                    description={COPY.noImagesLede}
                />
            )}

            <FileUpload
                label={uploading ? COPY.uploading : COPY.upload}
                accept={LISTING_IMAGE_ACCEPT}
                maxSize={MAX_LISTING_IMAGE_BYTES}
                multiple
                disabled={busy || full}
                progress={uploading ? (uploadProgress ?? 0) : undefined}
                hint={full ? COPY.uploadFull : COPY.uploadHint}
                onFiles={onUpload}
            />
        </Panel>
    );
}

ListingMediaPanel.displayName = "ListingMediaPanel";
