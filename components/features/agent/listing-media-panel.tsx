"use client";

import { useRef, type ChangeEvent } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { ListingImageCard } from "@/components/features/agent/listing-image-card";
import {
    LISTING_IMAGE_ACCEPT,
    MAX_LISTING_IMAGES,
} from "@/lib/config/listing-form";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import { movedImageIds } from "@/lib/data/listing-form";
import type { PropertyImage } from "@/lib/validations/property";

export interface ListingMediaPanelProps {
    id: string;
    images: readonly PropertyImage[];
    busy: boolean;
    uploading: boolean;
    onUpload: (files: File[]) => void;
    onReorder: (ids: string[]) => void;
    onRemove: (imageId: string) => void;
}

export function ListingMediaPanel({
    id,
    images,
    busy,
    uploading,
    onUpload,
    onReorder,
    onRemove,
}: ListingMediaPanelProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const full = images.length >= MAX_LISTING_IMAGES;

    const onFiles = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        event.target.value = "";
        if (files.length > 0) onUpload(files);
    };

    return (
        <Panel
            id={id}
            title={COPY.media}
            description={COPY.mediaLede}
            count={`${images.length}/${MAX_LISTING_IMAGES}`}
            countQuiet
            action={
                <>
                    <input
                        ref={fileRef}
                        type="file"
                        multiple
                        accept={LISTING_IMAGE_ACCEPT}
                        className="hidden"
                        tabIndex={-1}
                        aria-hidden="true"
                        onChange={onFiles}
                    />
                    <Button
                        type="button"
                        icon={Upload}
                        isLoading={uploading}
                        disabled={busy || full}
                        onClick={() => fileRef.current?.click()}
                    >
                        {uploading ? COPY.uploading : COPY.upload}
                    </Button>
                </>
            }
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

            <p className="text-text-muted text-xs">
                {full ? COPY.uploadFull : COPY.uploadHint}
            </p>
        </Panel>
    );
}

ListingMediaPanel.displayName = "ListingMediaPanel";
