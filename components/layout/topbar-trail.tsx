"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { TrailCrumb } from "@/lib/types";
import { cn } from "@/lib/utils";

const linkBase =
    "hover:text-accent focus-visible:ring-accent ease-smooth rounded-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

export interface TopbarTrailProps {
    crumbs: TrailCrumb[];
}

export function TopbarTrail({ crumbs }: TopbarTrailProps) {
    return (
        <nav aria-label="Breadcrumb" className="min-w-0 select-none">
            <ol className="flex min-w-0 items-center gap-2">
                {crumbs.map((crumb, index) => (
                    <li
                        key={crumb.href}
                        className="flex min-w-0 items-center gap-2"
                    >
                        {index > 0 && (
                            <ChevronRight
                                size={12}
                                strokeWidth={1.5}
                                aria-hidden="true"
                                className="text-text-muted shrink-0"
                            />
                        )}

                        {crumb.current ? (
                            <span className="text-text truncate text-xs font-semibold">
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                href={crumb.href}
                                className={cn(
                                    linkBase,
                                    index === 0
                                        ? "micro-label shrink-0"
                                        : "text-text-secondary truncate text-xs",
                                )}
                            >
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

TopbarTrail.displayName = "TopbarTrail";
