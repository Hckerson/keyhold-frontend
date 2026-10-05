import { ShareRow } from "@/components/patterns/share-row";
import type { ShareDatum } from "@/lib/types";

export interface ShareListProps {
    shares: ShareDatum[];
}

export function ShareList({ shares }: ShareListProps) {
    return (
        <ul className="divide-border divide-y">
            {shares.map((share) => (
                <ShareRow key={share.id} share={share} />
            ))}
        </ul>
    );
}

ShareList.displayName = "ShareList";
