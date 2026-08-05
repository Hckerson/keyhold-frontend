import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const MESSAGES_TITLE = "Messages";
const MESSAGES_LEDE =
    "Every thread with your agents, concierge and coordinators";
const COMPOSE_ACTION = "New Message";

export interface MessagesHeaderProps {
    summary: string;
}

export function MessagesHeader({ summary }: MessagesHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {MESSAGES_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {MESSAGES_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Button type="button" variant="primary" size="sm">
                    <PenSquare
                        className="mr-1.5 size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    {COMPOSE_ACTION}
                </Button>
            </div>
        </header>
    );
}

MessagesHeader.displayName = "MessagesHeader";
