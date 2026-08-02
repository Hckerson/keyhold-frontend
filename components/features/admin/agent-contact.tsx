import { Mail, Phone } from "lucide-react";
import type { ModerationAgent } from "@/lib/data/admin-listings";

export function AgentContact({ agent }: { agent: ModerationAgent }) {
    return (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="text-text font-medium">{agent.name}</span>
            <a
                href={`mailto:${agent.email}`}
                className="text-text-secondary hover:text-accent ease-smooth flex items-center gap-1 transition-colors"
            >
                <Mail
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0"
                />
                {agent.email}
            </a>
            <a
                href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
                className="text-text-secondary hover:text-accent ease-smooth flex items-center gap-1 transition-colors"
            >
                <Phone
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0"
                />
                {agent.phone}
            </a>
        </div>
    );
}
