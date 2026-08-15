import { Image } from "@/components/ui/image";

const PHOTO_NOUN = "photo";

export interface ModerationPhotoStripProps {
    photos: string[];
    address: string;
}

export function ModerationPhotoStrip({
    photos,
    address,
}: ModerationPhotoStripProps) {
    return (
        <div className="grid grid-cols-3 gap-1.5">
            {photos.map((src, index) => (
                <Image
                    key={src}
                    src={src}
                    alt={`${address} ${PHOTO_NOUN} ${index + 1}`}
                    loading="lazy"
                    className="border-border-light rounded-md border"
                />
            ))}
        </div>
    );
}

ModerationPhotoStrip.displayName = "ModerationPhotoStrip";
