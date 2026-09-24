"use client";

import { useConfirmation } from "@/lib/hooks/use-confirmation";
import {
    useDeletePropertyImage,
    useReorderPropertyImages,
    useUploadPropertyImages,
} from "@/lib/hooks/use-properties";

export function useListingImages(propertyId: string) {
    const upload = useUploadPropertyImages(propertyId);
    const remove = useDeletePropertyImage(propertyId);
    const reorder = useReorderPropertyImages(propertyId);
    const removal = useConfirmation<string>(remove);

    return {
        uploading: upload.isPending,
        uploadProgress: upload.progress,
        busy: upload.isPending || remove.isPending || reorder.isPending,
        removal,
        upload: (files: File[]) => upload.mutate(files),
        confirmRemove: () => {
            if (removal.target) removal.confirm(removal.target);
        },
        reorder: (ids: string[]) => reorder.mutate(ids),
    };
}
