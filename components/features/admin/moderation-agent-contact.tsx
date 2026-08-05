import { Mail, Phone } from "lucide-react";
import { agentFirm } from "@/lib/data/admin-listings";
import type { ModerationAgent } from "@/lib/types";

const LINK =
    "text-text-secondary hover:text-accent ease-smooth flex items-center gap-1 truncate transition-colors";

export interface ModerationAgentContactProps {
    agent: ModerationAgent;
}

export function ModerationAgentContact({ agent }: ModerationAgentContactProps) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="text-text font-medium">{agent.name}</span>
            <span className="text-text-muted">{agentFirm(agent.email)}</span>
            <a href={`mailto:${agent.email}`} className={LINK}>
                <Mail
                    className="size-3 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
                {agent.email}
            </a>
            <a
                href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
                className={LINK}
            >
                <Phone
                    className="size-3 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
                <span className="tabular-nums">{agent.phone}</span>
            </a>
        </div>
    );
}

ModerationAgentContact.displayName = "ModerationAgentContact";
