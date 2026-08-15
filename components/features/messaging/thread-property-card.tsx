import { Image } from "@/components/ui/image";
import { PanelLink } from "@/components/features/shared/panel-link";
import type { Conversation } from "@/lib/types";
import { formatMillions } from "@/lib/utils";

const ASKING_LABEL = "Asking";
const VIEW_ACTION = "View listing";

export interface ThreadPropertyCardProps {
    conversation: Conversation;
}

export function ThreadPropertyCard({ conversation }: ThreadPropertyCardProps) {
    return (
        <div className="flex flex-col gap-2 py-3">
            <Image
                variant="thumbnail"
                src={conversation.photo}
                alt={conversation.property}
                loading="lazy"
                className="border-border-light h-20 w-full rounded-lg border object-cover"
            />
            <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                    <p className="text-h4 font-display text-text font-light tabular-nums">
                        {formatMillions(conversation.price, 2)}
                    </p>
                    <span className="micro-label">{ASKING_LABEL}</span>
                </div>
                <p className="text-text mt-0.5 truncate text-xs font-semibold">
                    {conversation.property}
                </p>
                <p className="text-text-muted truncate text-xs">
                    {conversation.locality}
                </p>
            </div>
            <PanelLink
                href={`/listing/${conversation.listingId}`}
                label={VIEW_ACTION}
            />
        </div>
    );
}

ThreadPropertyCard.displayName = "ThreadPropertyCard";
