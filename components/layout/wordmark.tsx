import Link from "next/link";
import { cn } from "@/lib/utils";

export interface WordmarkProps {
    href?: string;
    tone?: "light" | "dark";
    className?: string;
}

export function Wordmark({
    href = "/",
    tone = "light",
    className,
}: WordmarkProps) {
    const content = (
        <span className={cn("inline-flex items-center gap-2", className)}>
            <span
                className={cn(
                    "grid size-8 place-items-center rounded-lg text-sm font-bold",
                    tone === "dark"
                        ? "bg-background/15 text-text-inverse ring-background/25 ring-1 backdrop-blur-sm"
                        : "bg-accent text-text-inverse",
                )}
            >
                LRE
            </span>
            <span
                className={cn(
                    "font-display text-xl font-light",
                    tone === "dark" ? "text-text-inverse" : "text-text",
                )}
            >
                Luxury RE
            </span>
        </span>
    );

    if (!href) return content;

    return (
        <Link
            href={href}
            className="ease-smooth inline-flex transition-opacity hover:opacity-90"
        >
            {content}
        </Link>
    );
}

Wordmark.displayName = "Wordmark";
