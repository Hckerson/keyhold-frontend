import { Image } from "@/components/ui/image";
import type { ShortlistItem } from "@/lib/data/home-concierge";
import { propertyImage } from "@/lib/data/sample-images";
import { CONCIERGE_ARTIFACT_LABEL } from "@/lib/config/home-concierge";

export interface ShortlistStackProps {
    items: ShortlistItem[];
}

export function ShortlistStack({ items }: ShortlistStackProps) {
    return (
        <ul className="flex flex-col gap-2.5">
            {items.map((item) => (
                <li key={item.address} className="flex items-center gap-3">
                    <Image
                        variant="bare"
                        width={40}
                        height={40}
                        sizes="40px"
                        src={propertyImage(item.imageSeed)}
                        alt=""
                        className="border-border-light size-10 shrink-0 rounded-sm border object-cover"
                    />
                    <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="text-text truncate text-xs font-semibold">
                            {item.address}
                        </p>
                        <p className={CONCIERGE_ARTIFACT_LABEL}>{item.note}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
