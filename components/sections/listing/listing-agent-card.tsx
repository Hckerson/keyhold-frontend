import Link from "next/link";
import { ArrowUpRight, MessageSquare, Phone, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import type { ListingAgent } from "@/lib/types";
function formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, "").slice(-10);
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function ListingAgentCard({ agent }: { agent: ListingAgent }) {
    return (
        <Panel title="Your agent">
            <div className="flex items-start gap-3">
                <Avatar
                    size="lg"
                    src={agent.avatarUrl}
                    alt={agent.name}
                    initials={agent.name.charAt(0)}
                />
                <div className="min-w-0 flex-1">
                    <p className="text-text truncate text-xs font-semibold">
                        {agent.name}
                    </p>
                    <p className="text-text-secondary truncate text-xs">
                        {agent.title} Â· {agent.agency}
                    </p>
                    <p className="text-text-muted font-mono text-[10px] tracking-[0.12em] uppercase">
                        {agent.license}
                    </p>
                </div>
            </div>

            <div className="border-border mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-3">
                <span className="text-text inline-flex items-center gap-1 text-xs font-semibold tabular-nums">
                    <Star
                        size={12}
                        strokeWidth={1.5}
                        className="fill-highlight text-highlight"
                    />
                    {agent.rating.toFixed(1)}
                </span>
                <span className="text-text-secondary text-xs tabular-nums">
                    {agent.reviews} reviews
                </span>
                <span className="text-highlight-dark text-xs font-medium">
                    {agent.responseTime}
                </span>
            </div>

            <div className="border-border mt-3 flex flex-col gap-2 border-t pt-3">
                <a href={`tel:${agent.phone}`} className="block">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        icon={<Phone className="size-3" strokeWidth={1.5} />}
                    >
                        Call {formatPhone(agent.phone)}
                    </Button>
                </a>
                <a href={`mailto:${agent.email}`} className="block">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        icon={
                            <MessageSquare
                                className="size-3"
                                strokeWidth={1.5}
                            />
                        }
                    >
                        Message
                    </Button>
                </a>
                <Link
                    href={`/search?q=${encodeURIComponent(agent.name)}`}
                    className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth inline-flex items-center gap-1 rounded text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    View other listings ({agent.activeListings})
                    <ArrowUpRight size={12} strokeWidth={1.5} />
                </Link>
            </div>
        </Panel>
    );
}

ListingAgentCard.displayName = "ListingAgentCard";
