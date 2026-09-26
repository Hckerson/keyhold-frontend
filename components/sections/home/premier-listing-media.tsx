import { Image } from "@/components/ui/image";
import { FeaturedBadge } from "@/components/features/shared/featured-badge";

export interface PremierMediaView {
    image: string;
    name: string;
    badge?: string;
}

export function PremierListingMedia({
    listing,
}: {
    listing: PremierMediaView;
}) {
    return (
        <div className="relative">
            <FeaturedBadge label={listing.badge} />
            <Image
                variant="bare"
                width={1200}
                height={560}
                sizes="(min-width: 64rem) 58vw, 100vw"
                src={listing.image}
                alt={listing.name}
                className="h-100 w-full rounded-xl object-cover shadow-md md:h-140"
            />
        </div>
    );
}

PremierListingMedia.displayName = "PremierListingMedia";
