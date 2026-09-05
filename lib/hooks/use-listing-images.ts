"use client";

import {
    useDeletePropertyImage,
    useReorderPropertyImages,
    useUploadPropertyImages,
} from "@/lib/hooks/use-properties";

export function useListingImages(propertyId: string) {
    const upload = useUploadPropertyImages(propertyId);
    const remove = useDeletePropertyImage(propertyId);
    const reorder = useReorderPropertyImages(propertyId);

    return {
        uploading: upload.isPending,
        busy: upload.isPending || remove.isPending || reorder.isPending,
        upload: (files: File[]) => upload.mutate(files),
        remove: (imageId: string) => remove.mutate(imageId),
        reorder: (ids: string[]) => reorder.mutate(ids),
    };
}
