import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_CHANNELS } from "@/lib/data/contact-page";

export function ContactChannels() {
    return (
        <ul className="mt-8 flex max-w-[68ch] flex-col gap-3">
            {CONTACT_CHANNELS.map((channel) => {
                const Icon = channel.icon;

                return (
                    <li
                        key={channel.id}
                        className="border-border-light bg-background-muted rounded-lg border p-4"
                    >
                        <div className="flex items-start gap-3">
                            <span className="bg-accent-light text-accent grid size-8 shrink-0 place-items-center rounded-md">
                                <Icon
                                    className="size-4"
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                />
                            </span>

                            <div className="min-w-0 flex-1">
                                <p className="text-text text-xs font-semibold">
                                    {channel.label}
                                </p>
                                <p className="text-text-secondary mt-1 text-sm leading-relaxed">
                                    {channel.detail}
                                </p>

                                {channel.external ? (
                                    <a
                                        href={channel.href}
                                        className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth mt-2 inline-flex items-center gap-1 rounded-xs text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                                    >
                                        {channel.action}
                                        <ArrowUpRight
                                            className="size-3"
                                            strokeWidth={1.5}
                                            aria-hidden="true"
                                        />
                                    </a>
                                ) : (
                                    <Link
                                        href={channel.href}
                                        className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth mt-2 inline-flex items-center gap-1 rounded-xs text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                                    >
                                        {channel.action}
                                        <ArrowUpRight
                                            className="size-3"
                                            strokeWidth={1.5}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

ContactChannels.displayName = "ContactChannels";
