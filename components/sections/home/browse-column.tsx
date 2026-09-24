import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatCount } from "@/lib/utils/format";
import type { BrowseGroup } from "@/lib/types";

export function BrowseColumn({ group }: { group: BrowseGroup }) {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-text-muted font-mono text-[10px] tracking-[0.14em] uppercase">
                {group.title}
            </h3>
            <ul className="border-border flex flex-col border-t">
                {group.entries.map((entry) => (
                    <li
                        key={entry.id}
                        className="border-border-light border-b last:border-b-0"
                    >
                        <Link
                            href={entry.href}
                            className="group text-text hover:text-accent focus-visible:ring-accent ease-smooth flex h-9 items-center gap-2 text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                        >
                            <span className="truncate font-medium">
                                {entry.label}
                            </span>
                            <ArrowUpRight
                                size={12}
                                strokeWidth={1.5}
                                className="text-text-muted ease-smooth opacity-0 transition-opacity group-hover:opacity-100"
                            />
                            <span className="text-text-muted ml-auto font-mono text-[10px] tabular-nums">
                                {formatCount(entry.count)}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

BrowseColumn.displayName = "BrowseColumn";
