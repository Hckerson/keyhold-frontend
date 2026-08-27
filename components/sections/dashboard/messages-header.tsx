import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const MESSAGES_TITLE = "Messages";
const MESSAGES_LEDE =
    "Every thread with your agents, concierge and coordinators";
const COMPOSE_ACTION = "New Message";

export interface MessagesHeaderProps {
    summary: string;
    onCompose: () => void;
}

export function MessagesHeader({ summary, onCompose }: MessagesHeaderProps) {
    return (
        <PortalHeader
            title={MESSAGES_TITLE}
            lede={MESSAGES_LEDE}
            summary={summary}
            action={
                <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={onCompose}
                >
                    <PenSquare
                        className="mr-1.5 size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    {COMPOSE_ACTION}
                </Button>
            }
        />
    );
}

MessagesHeader.displayName = "MessagesHeader";
