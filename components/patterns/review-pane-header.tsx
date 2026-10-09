import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface ReviewPaneHeaderProps {
    title: string;
    caption: string;
    href: string;
    linkLabel: string;
    lead?: ReactNode;
}

export function ReviewPaneHeader({
    title,
    caption,
    href,
    linkLabel,
    lead,
}: ReviewPaneHeaderProps) {
    return (
        <header className="border-border-light flex items-center gap-3 border-b px-4 py-3">
            {lead}
            <div className="min-w-0 flex-1">
                <h2 className="text-text truncate text-sm">{title}</h2>
                <p className="text-text-muted truncate text-xs">{caption}</p>
            </div>
            <Link
                href={href}
                className="text-text-secondary hover:text-accent ease-smooth focus-visible:ring-accent inline-flex shrink-0 items-center gap-1 rounded-xs text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                {linkLabel}
                <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
            </Link>
        </header>
    );
}

ReviewPaneHeader.displayName = "ReviewPaneHeader";
