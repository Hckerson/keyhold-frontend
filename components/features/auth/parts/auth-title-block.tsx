import Link from "next/link";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import { cn } from "@/lib/utils";

export interface AuthTitleBlockEntry {
    label: string;
    href: string;
    action: string;
}

export interface AuthTitleBlockProps {
    entries: AuthTitleBlockEntry[];
}

export function AuthTitleBlock({ entries }: AuthTitleBlockProps) {
    if (entries.length === 0) return null;

    return (
        <div
            className={cn(
                "border-border-dark bg-background-muted grid grid-rows-[auto_auto] gap-y-0.5 rounded-xs border",
                entries.length > 1 ? "grid-cols-2" : "grid-cols-1",
            )}
        >
            {entries.map((entry, position) => (
                <div
                    key={entry.label}
                    className={cn(
                        "row-span-2 grid grid-rows-subgrid px-3 py-2",
                        position > 0 && "border-border-dark border-l",
                    )}
                >
                    <span
                        className={cn(
                            authLabelVariants({ tier: "label" }),
                            "text-text-muted",
                        )}
                    >
                        {entry.label}
                    </span>
                    <Link
                        href={entry.href}
                        className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth rounded-xs text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        {entry.action}
                    </Link>
                </div>
            ))}
        </div>
    );
}

AuthTitleBlock.displayName = "AuthTitleBlock";
