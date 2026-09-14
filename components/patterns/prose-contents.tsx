"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROSE_COPY, proseHeadingId } from "@/lib/config/prose";
import { SCROLL_HEADING_TRAIL } from "@/lib/config/public-motion";
import type { ProseBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ProseContentsProps {
    blocks: ProseBlock[];
}

export function ProseContents({ blocks }: ProseContentsProps) {
    const [activeId, setActiveId] = useState(blocks[0]?.id ?? "");
    const reachedRef = useRef(new Set<string>());

    useEffect(() => {
        const order = blocks.map((block) => block.id);
        const blockIdByHeading = new Map(
            order.map((id) => [proseHeadingId(id), id]),
        );
        const headings = order
            .map((id) => document.getElementById(proseHeadingId(id)))
            .filter((heading) => heading !== null);
        const reached = reachedRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = blockIdByHeading.get(entry.target.id);
                    if (!id) continue;
                    if (entry.isIntersecting) reached.add(id);
                    else reached.delete(id);
                }
                const passed = order.filter((id) => reached.has(id));
                if (passed.length > 0) setActiveId(passed[passed.length - 1]);
            },
            { rootMargin: SCROLL_HEADING_TRAIL },
        );
        headings.forEach((heading) => observer.observe(heading));

        return () => {
            observer.disconnect();
            reached.clear();
        };
    }, [blocks]);

    return (
        <nav aria-label={PROSE_COPY.contents} className="prose-contents">
            <p className="micro-label">{PROSE_COPY.contents}</p>
            <ul className="mt-2 flex flex-col">
                {blocks.map((block) => {
                    const active = block.id === activeId;

                    return (
                        <li key={block.id}>
                            <Link
                                href={`#${block.id}`}
                                aria-current={active ? "location" : undefined}
                                className={cn(
                                    "focus-visible:ring-accent ease-smooth block rounded-xs border-l py-1.5 pl-3 text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                                    active
                                        ? "border-accent text-text font-medium"
                                        : "border-border-light text-text-secondary hover:text-accent",
                                )}
                            >
                                {block.heading}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

ProseContents.displayName = "ProseContents";
