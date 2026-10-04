import { Mail, Phone } from "lucide-react";
import type { ModerationAgent } from "@/lib/types";

const LINK =
    "text-text-secondary hover:text-accent ease-smooth flex items-center gap-1 truncate transition-colors";

const NO_PHONE = "—";

export interface ModerationAgentContactProps {
    agent: ModerationAgent;
}

export function ModerationAgentContact({ agent }: ModerationAgentContactProps) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="text-text font-medium">{agent.name}</span>
            <a href={`mailto:${agent.email}`} className={LINK}>
                <Mail
                    className="size-3 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
                {agent.email}
            </a>
            {agent.phone ? (
                <a href={`tel:${agent.phone}`} className={LINK}>
                    <Phone
                        className="size-3 shrink-0"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    <span className="tabular-nums">{agent.phone}</span>
                </a>
            ) : (
                <span className="text-text-muted">{NO_PHONE}</span>
            )}
        </div>
    );
}

ModerationAgentContact.displayName = "ModerationAgentContact";
