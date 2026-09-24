"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { Image } from "@/components/ui/image";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import type { PropertyImage } from "@/lib/validations/property";

const WARNING = {
    title: COPY.removeImageWarning,
    body: COPY.removeImageWarningLede,
};
const FAILURE = {
    title: COPY.removeImageFailed,
    body: COPY.removeImageFailedLede,
};

export interface ListingImageRemoveModalProps {
    address: string;
    images: readonly PropertyImage[];
    imageId: string | null;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ListingImageRemoveModal({
    address,
    images,
    imageId,
    pending,
    failed,
    onClose,
    onConfirm,
}: ListingImageRemoveModalProps) {
    const image = images.find((item) => item.id === imageId);
    const position = image ? images.indexOf(image) + 1 : 0;

    return (
        <ConfirmModal
            open={image !== undefined}
            title={COPY.removeImageConfirm}
            subject={`${address} · ${position}/${images.length}`}
            warning={WARNING}
            failure={FAILURE}
            cancelLabel={COPY.keepImage}
            confirmLabel={COPY.removeImage}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        >
            {image && (
                <div className="border-border-light relative aspect-video overflow-hidden rounded-md border">
                    <Image
                        variant="bare"
                        fill
                        src={image.url}
                        alt={`Listing photo ${position} of ${images.length}`}
                        sizes="28rem"
                        className="object-cover"
                    />
                </div>
            )}
        </ConfirmModal>
    );
}

ListingImageRemoveModal.displayName = "ListingImageRemoveModal";
